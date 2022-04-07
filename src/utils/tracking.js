const puppeteer = require('puppeteer');

const buildUrl = (trackingID, language) => {
  let url = '';
  if (language === 'en') {
    url = `https://www.posti.fi/en/tracking#/lahetys/${trackingID}?lang=en`;
  } else if (language === 'sv') {
    url = ` https://www.posti.fi/sv/uppfoljning#/lahetys/${trackingID}?lang=sv`;
  } else {
    url = `https://www.posti.fi/fi/seuranta#/lahetys/${trackingID}`;
  }
  return url;
};

const getTrackingData = (trackingID, language) => {
  const url = buildUrl(trackingID, language);
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      await Promise.race([
        page
          .waitForSelector('section + section')
          .then(() => page.click('#show-more-button')),
        page.waitForSelector('img[src="/img/404-500-error.svg"]'),
      ]);

      const getEvents = await page.evaluate(() => {
        let results = [];
        let info = [];
        let errors = [];
        let title = '';
        let subtitle = '';
        const error = document.querySelector(
          'img[src="/img/404-500-error.svg"]'
        );

        if (!error) {
          const btn = document.getElementById('show-more-button');
          btn.click();

          title = document.querySelector(
            'section + section > div:first-child > div:first-child'
          ).textContent;

          const elements = document.querySelectorAll('[role="group"]');

          elements.forEach((element) => {
            let obj = {
              description: '',
              location: '',
              timestamp: '',
            };
            if (element.children) {
              obj.timestamp = element.children[0].textContent;
              obj.description = element.children[1].textContent;
            }
            if (element.nextElementSibling) {
              obj.location = element.nextElementSibling.textContent;
            }
            results.push(obj);
          });
        } else {
          const titleElement = error.nextElementSibling;
          const subtitleElement = titleElement.nextElementSibling;

          results = null;
          title = titleElement.textContent;
          subtitle = subtitleElement.textContent;
          errors = Array.from(subtitleElement.nextElementSibling.children).map(
            (child) => child.textContent
          );
        }
        return {
          results,
          info,
          errors,
          title,
          subtitle,
        };
      });

      browser.close();
      return resolve(getEvents);
    } catch (e) {
      return reject(e);
    }
  });
};
//getTrackingData('JJFI62974420069974717', 'en');

exports.getTrackingData = getTrackingData;
