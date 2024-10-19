import fs from 'fs-extra';
import { config } from './config/config';
import { parallelScrape } from './scraper/parallelScraper';
import { generateTableOfContents } from './utils/markdownSaver';
import { statsTracker } from './utils/statsTracker';

async function main(startUrl: string) {
  try {
    console.log('Starting the scraper...');
    // Ensure the output directory exists
    await fs.ensureDir(config.outputDir);
    console.log(`Output directory ensured: ${config.outputDir}`);
    
    // Start the parallel scraping process
    await parallelScrape([startUrl]);
    console.log('Parallel scrape completed');
    
    // Generate table of contents for all scraped content
    await generateTableOfContents();
    
    statsTracker.finish();
    statsTracker.logStats();
    
    console.log('Scraping completed successfully');
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Set the starting URL for the scraper
// TODO: Replace this with the actual documentation site URL you want to scrape
const startUrl = 'https://dydxprotocol.github.io/v3-teacher/';

// Run the main function and catch any unhandled errors
main(startUrl).catch(console.error);
