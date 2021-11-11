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

      await page.waitForSelector('.page-menu-row, .error-box');

      const getEvents = await page.evaluate(() => {
        const error = document.querySelector('.error-box .error-box-header');
        let results = [];
        let info = [];
        let title = '';
        if (!error) {
          title = document.querySelector('.status-text').innerText;

          const getText = (i, className) => {
            const element = i.querySelector(className);
            if (element === null) {
              return '';
            } else return element.innerText;
          };

          const getParentText = (element) =>
            element.parentElement.previousElementSibling.innerText;

          // Get all item events
          const items = document.querySelectorAll('.page-menu-row');
          items.forEach((item) => {
            results.push({
              description: getText(item, '.wd_shipment_event_description'),
              location: getText(item, '.wd_shipment_event_location'),
              timestamp: getText(item, '.wd_shipment_event_timestamp'),
            });
          });

          // Get item info
          const infoContainer = document.querySelector('.shipment-pickup-info');
          if (infoContainer) {
            const weightEl = document.querySelector('.wd_shipment_weight');
            const volumeEl = document.querySelector('.wd_shipment_volume');
            const dimensionsEl = document.querySelector(
              '.wd_shipment_dimensions'
            );

            const weight = weightEl && {
              [getParentText(weightEl)]: weightEl.innerText,
            };

            const volume = volumeEl && {
              [getParentText(volumeEl)]: volumeEl.innerText,
            };

            const dimensions = dimensionsEl && {
              [getParentText(dimensionsEl)]: dimensionsEl.innerText,
            };

            info.push(weight, volume, dimensions);
          }
        } else {
          results = [];
          title = document.querySelector('.error-box').innerText;
        }

        return {
          results,
          info,
          title,
          error: !error ? false : true,
        };
      });
      browser.close();
      return resolve(getEvents);
    } catch (e) {
      return reject(e);
    }
  });
};

exports.getTrackingData = getTrackingData;
