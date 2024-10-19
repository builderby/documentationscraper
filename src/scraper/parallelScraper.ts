import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import type { PuppeteerLaunchOptions } from 'puppeteer';
import { checkRobotsTxt } from '../utils/robotsTxtChecker';
import { scrapeDocumentation } from './scraper';
import { config } from '../config/config';

puppeteer.use(StealthPlugin());

export async function parallelScrape(urls: string[]): Promise<void> {
  try {
    console.log('Launching browser...');

    const launchOptions: PuppeteerLaunchOptions = {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };

    if (config.proxyUrl) {
      console.log(`Using proxy: ${config.proxyUrl}`);
      launchOptions.args?.push(`--proxy-server=${config.proxyUrl}`);
    }

    const browser = await puppeteer.launch(launchOptions);
    console.log('Browser launched successfully');

    const page = await browser.newPage();
    console.log('New page created');

    for (const url of urls) {
      if (await checkRobotsTxt(url)) {
        await scrapeDocumentation(url, page);
      } else {
        console.log(`Skipping ${url} due to robots.txt restrictions`);
      }
    }

    console.log('All tasks completed');
    await browser.close();
  } catch (error) {
    console.error('Error in parallelScrape:', error);
    throw error;
  }
}
