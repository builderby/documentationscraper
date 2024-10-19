import UserAgent from 'user-agents';

/**
 * Generates a random user agent string for desktop devices.
 * @returns {string} A random user agent string.
 */
function getRandomUserAgent(): string {
  const userAgent = new UserAgent({ deviceCategory: 'desktop' });
  console.log(userAgent.toString());
  return userAgent.toString();
}

/**
 * Configuration object for the documentation scraper.
 */
export const config = {
  /** Maximum depth of links to follow from the starting URL. */
  maxDepth: 50,
  /** Types of content to extract from the pages. */
  contentTypes: ['text', 'code', 'images', 'tables', 'lists'],
  /** Rate limit in milliseconds between requests. */
  rateLimit: 1000,
  /** User agent string to use for requests. */
  userAgent: getRandomUserAgent(),
  /** Directory to save the scraped content. */
  outputDir: './output',
  /** Proxy URL to use for requests. Set to undefined if not using a proxy. */
  proxyUrl: undefined,
};
