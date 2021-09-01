const puppeteer = require('puppeteer');

/**
 * 
 * @param {*} trackingID 
 * @returns 
 */

const getTrackingData = (trackingID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://www.posti.fi/fi/seuranta#/lahetys/${trackingID}`)
      ;

      await page.waitForSelector('.page-menu-row, .error-box');
      
      let tracking = await page.evaluate(() => {
        const error = document.querySelector('.error-box')
        let results = [];
        let title = '';
        if(!error) {
          title = document.querySelector('.status-text').innerText;
          let items = document.querySelectorAll('.page-menu-row');
          const getText = (i, className) => i.querySelector(className).innerText
          items.forEach((item) => {
            results.push(
              {
                description: getText(item, '.wd_shipment_event_description'),
                location: getText(item, '.wd_shipment_event_location'),
                timestamp: getText(item, '.wd_shipment_event_timestamp'),
              }
            );
          });
        } else {
          results = [];
          title = 'Voe rähmä, mittään ei löytynny!'
        }
        return {
          results,
          title,
          error: !error ? false : true
        };
      })
      browser.close();
      return resolve(tracking);
    } catch (e) {
      return reject(e);
    }
  })
}

exports.getTrackingData = getTrackingData 
