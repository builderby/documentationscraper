import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { config } from '../config/config';

puppeteer.use(StealthPlugin());

export async function setupBrowser() {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true as any, // Use 'as any' to bypass type checking
      ...(config.proxyUrl ? { 
        args: [...(puppeteer.defaultArgs() || []), `--proxy-server=${config.proxyUrl}`],
      } : {}),
    });

    console.log('Browser launched successfully');

    const page = await browser.newPage();
    console.log('New page created');

    await page.setUserAgent(config.userAgent);
    console.log('User agent set');

    await page.setRequestInterception(true);
    console.log('Request interception set');

    page.on('request', (request) => {
      if (request.resourceType() === 'document') {
        request.continue();
      } else {
        request.abort();
      }
    });

    return { browser, page };
  } catch (error) {
    console.error('Error in setupBrowser:', error);
    throw error;
  }
}
