import { load } from 'cheerio';
import { extractContent } from '../utils/contentExtractor';
import { getCurrentUserAgent } from '../utils/markdownSaver';
import { Browser } from 'puppeteer';
import { statsTracker } from '../utils/statsTracker';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';

const visitedUrls = new Set<string>();

export async function scrapeDocumentation(url: string, browser: Browser): Promise<void> {
  console.log(`Processing URL: ${url}`);

  // Normalize the URL to avoid duplicates due to different hash fragments
  const normalizedUrl = new URL(url);
  const baseUrl = normalizedUrl.origin + normalizedUrl.pathname;

  if (visitedUrls.has(baseUrl)) {
    console.log(`Skipping already visited URL: ${baseUrl}`);
    return;
  }

  visitedUrls.add(baseUrl);

  try {
    const page = await browser.newPage();
    await page.setUserAgent(getCurrentUserAgent());

    await page.goto(baseUrl, { waitUntil: 'networkidle0' });
    console.log(`Successfully navigated to ${baseUrl}`);

    // Ensure content is fully loaded
    await new Promise(resolve => setTimeout(resolve, 1000));

    const content = await page.content();
    const $ = load(content);

    // Extract the main content of the page
    const markdown = await extractContent($);

    if (!markdown || markdown.trim().length === 0) {
      console.warn(`No content extracted for ${baseUrl}`);
    } else {
      // Get the page title
      const title = $('title').text().trim();
      const cleanedTitle = cleanTitle(title);

      // Prepare content with header
      const pageContent = `# ${cleanedTitle}\n\n${markdown}`;

      // Get path segments and folder name
      const pathSegments = normalizedUrl.pathname.split('/').filter(segment => segment !== '');
      const folderName = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : 'home';

      // Generate a file path based on the URL pathname
      let outputFilePath = path.join(
        'output',
        normalizedUrl.hostname,
        ...pathSegments,
        `${folderName}.md`
      );

      // Ensure the output directory exists
      fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

      // Save the content to the appropriate file
      fs.writeFileSync(outputFilePath, pageContent);

      console.log(`Saved content for ${cleanedTitle} to ${outputFilePath}`);

      statsTracker.incrementPages();
      statsTracker.incrementImages($('img').length);
      statsTracker.incrementCodeBlocks($('pre code').length);
    }

    // Get all internal links
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a'))
        .map(a => a.href)
        .filter(href => href.startsWith(window.location.origin));
    });

    statsTracker.incrementLinks(links.length);

    await page.close();

    // Recursively scrape linked pages
    for (const link of links) {
      await scrapeDocumentation(link, browser);
    }

    console.log(`Scraping of ${url} completed`);
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  }
}

function cleanTitle(title: string): string {
  return title.replace(/Copy to Clipboard/g, '').trim();
}
