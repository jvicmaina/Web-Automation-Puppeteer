import puppeteer, { Browser, Page } from 'puppeteer';

interface NewsItem {
  title: string;
  author?: string;
  date?: string;
  teaser?: string;
  imageUrl?: string;
}

async function launchBrowser(): Promise<Browser> {
  return await puppeteer.launch({ headless: 'new' });
}

async function navigateToPage(browser: Browser, url: string): Promise<Page> {
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000, isMobile: false, isLandscape: true, hasTouch: false, deviceScaleFactor: 1 });
  await page.setGeolocation({ latitude: 49.5, longitude: 100.0 });
  await page.goto(url, { timeout: 120000 });
  return page;
}

async function extractKenyanNewsData(page: Page): Promise<NewsItem[]> {
  try {
    await page.waitForSelector('.news-article-list');

    const newsData: NewsItem[] = await page.evaluate(() => {
      const articles = document.querySelectorAll('.news-article-list');

      const data: NewsItem[] = [];

      articles.forEach((article) => {
        const titleElement = article.querySelector('.news-title a') as HTMLElement;
        const authorElement = article.querySelector('.news-author') as HTMLElement;
        const dateElement = article.querySelector('.datetime') as HTMLElement;
        const teaserElement = article.querySelector('.news-teaser') as HTMLElement;
        const imageElement = article.querySelector('.field--name-field-media-image img') as HTMLImageElement;

        if (titleElement && authorElement && dateElement && imageElement && teaserElement) {
          const title = titleElement.innerText.trim();
          const author = authorElement.innerText.trim();
          const date = dateElement.innerText.trim();
          const teaser = teaserElement.innerText.trim();
          const imageUrl = imageElement.src;

          data.push({ title, author, date, imageUrl, teaser });
        }
      });

      return data;
    });

    return newsData;
  } catch (error) {
    console.error('Error extracting Kenyan news data:', error);
    throw error;
  }
}

async function extractCitizenNewsData(page: Page): Promise<NewsItem[]> {
  try {
    await page.waitForSelector('.topstory-excerpt');

    const title: string | null = await page.evaluate(() => {
      const titleElement = document.querySelector('.topstory-excerpt') as HTMLElement;
      return titleElement ? titleElement.innerText.trim() : null;
    });

    return title ? [{ title }] : [];
  } catch (error) {
    console.error('Error extracting Citizen news data:', error);
    throw error;
  }
}

async function closeBrowser(browser: Browser): Promise<void> {
  await browser.close();
}

(async () => {
  const browser = await launchBrowser();

  // Fetch data from Kenyans.co.ke
  const kenyanPage = await navigateToPage(browser, 'https://kenyans.co.ke/');
  const kenyanNewsData = await extractKenyanNewsData(kenyanPage);
  console.log('Kenyans.co.ke News Data:', kenyanNewsData);

  // Fetch data from Citizen Digital News
  const citizenPage = await navigateToPage(browser, 'https://citizen.digital/');
  const citizenNewsData = await extractCitizenNewsData(citizenPage);
  console.log('Citizen Digital News Data:', citizenNewsData);

  await closeBrowser(browser);
})();
