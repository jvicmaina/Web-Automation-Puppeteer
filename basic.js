import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({  headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000, isMobile: false, isLandscape: true, hasTouch: false, deviceScaleFactor: 1 });
  await page.setGeolocation({ latitude: 49.5, longitude: 100.0 });

  await page.goto('https://kenyans.co.ke/', { timeout: 120000 });

  // Wait for the necessary elements to load
  await page.waitForSelector('.news-article-list');

  // Extract data from each news article
  const newsData = await page.evaluate(() => {
    const articles = document.querySelectorAll('.news-article-list');

    const data = [];

    articles.forEach((article) => {
      const authorElement = article.querySelector('.news-author');
      const dateElement = article.querySelector('.datetime'); // Assuming there is a datetime class for the news date
      const titleElement = article.querySelector('.news-title a');
      const teaserElement = article.querySelector('.news-teaser');
      const imageElement = article.querySelector('.field--name-field-media-image img');

      if (authorElement && dateElement && titleElement && imageElement && teaserElement) {
        const author = authorElement.innerText.trim();
        const date = dateElement.innerText.trim();
        const title = titleElement.innerText.trim();
        const teaser =teaserElement.innerText.trim();  
        const imageUrl = imageElement.src;

        data.push({ author, date, title, imageUrl, teaser });// , body
      }
    });

    return data;
  });

  console.log(newsData);

  await browser.close();
})();
