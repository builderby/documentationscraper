import { load } from 'cheerio';
import { extractContent } from '../utils/contentExtractor';
import { saveMarkdown } from '../utils/markdownSaver';
import { config } from '../config/config';
import { Page } from 'puppeteer';
import { statsTracker } from '../utils/statsTracker';

const visitedUrls = new Set<string>();

export async function scrapeDocumentation(url: string, page: Page): Promise<void> {
  console.log(`Processing URL: ${url}`);

  if (visitedUrls.has(url)) {
    console.log(`Skipping already visited URL: ${url}`);
    return;
  }

  visitedUrls.add(url);

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    console.log(`Successfully navigated to ${url}`);
  
    const content = await page.content();
    const $ = load(content);

    let title = $('title').text().trim();
    title = cleanTitle(title);

    const markdown = await extractContent($);

    await saveMarkdown(title, markdown, url);

    statsTracker.incrementPages();
    statsTracker.incrementImages($('img').length);
    statsTracker.incrementCodeBlocks($('pre code').length);

    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a'))
        .map(a => a.href)
        .filter(href => href.startsWith(window.location.origin));
    });

    statsTracker.incrementLinks(links.length);

    for (const link of links) {
      await scrapeDocumentation(link, page);
    }

    console.log(`Scraping of ${url} completed`);
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  }
}

function cleanTitle(title: string): string {
  return title.replace(/Copy to Clipboard/g, '').trim();
}
