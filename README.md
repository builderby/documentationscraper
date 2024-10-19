# Usage Instructions for Documentation Scraper

```ascii
 ____                                        _        _   _             
|  _ \  ___   ___ _   _ _ __ ___   ___ _ __ | |_ __ _| |_(_) ___  _ __  
| | | |/ _ \ / __| | | | '_ ` _ \ / _ \ '_ \| __/ _` | __| |/ _ \| '_ \ 
| |_| | (_) | (__| |_| | | | | | |  __/ | | | || (_| | |_| | (_) | | | |
|____/ \___/ \___|\__,_|_| |_| |_|\___|_| |_|\__\__,_|\__|_|\___/|_| |_|
 ____                                
/ ___|  ___ _ __ __ _ _ __   ___ _ __ 
\___ \ / __| '__/ _` | '_ \ / _ \ '__|
 ___) | (__| | | (_| | |_) |  __/ |   
|____/ \___|_|  \__,_| .__/ \___|_|   
                     |_|              
```

An advanced web scraping application for documentation websites, built with TypeScript and Node.js.

## Overview

The Documentation Scraper is designed to crawl documentation websites and extract content into a single consolidated Markdown file. This tool is especially useful for creating local copies of documentation for offline access or for processing with Large Language Models (LLMs) and AI Agents.

## Features

- **Crawls documentation websites starting from a specified URL**
- **Consolidates all scraped content into a single Markdown file**
- **Converts HTML to Markdown**, preserving:
  - Text
  - Code blocks
  - Images
  - Tables
  - Lists
- Uses realistic user agents to avoid detection
- Implements rate limiting and politeness delays to respect server resources
- Recursively crawls linked pages to gather all relevant content
- Adheres to the website's `robots.txt` file
- Handles authentication and authorization
- Customizable content extraction and output file structure
- Outputs content into a structured, organized folder and file system

## Prerequisites

- **Node.js** (v18.16.0 or later)
- **npm** (v9.5.1 or later)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/documentationscraper.git
   cd documentationscraper
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Configuration

Customize the scraper's behavior by editing the `src/config/config.ts` file:

```typescript:src/config/config.ts
export const config = {
  maxDepth: 5, // Maximum depth of links to follow
  rateLimit: 2000, // Delay between requests in milliseconds
  outputDir: './output', // Directory to save scraped content
  proxyUrl: undefined, // URL of proxy server (optional)
};
```

- **maxDepth**: Controls how deep the scraper will navigate the link structure.
- **rateLimit**: Sets the delay between requests to avoid overwhelming the server.
- **outputDir**: Specifies where the output file will be saved.
- **proxyUrl**: If needed, set the proxy URL; otherwise, leave as `undefined`.

## Usage

1. **Set the starting URL in `src/index.ts`:**

   ```typescript:src/index.ts
   const startUrl = 'https://example.com/docs';
   ```

   Replace `'https://example.com/docs'` with the URL of the documentation you wish to scrape.

2. **Run the scraper:**

   ```bash
   npm start
   ```

   The scraper will launch and begin crawling from the `startUrl`, collecting content from each page and appending it to a file named `combined_documentation.md` in the `output` directory.

## Output

The output directory will contain:

```
output/
└── combined_documentation.md
```

- **combined_documentation.md**: A single Markdown file containing the scraped content from all visited pages, organized with headers indicating the source page titles.

## Customization

### Content Extraction

Modify `src/utils/contentExtractor.ts` to change how content is extracted and processed. By default, it:

- Removes unwanted HTML elements (e.g., scripts, styles)
- Converts HTML content to Markdown using TurndownService

### Scraping Logic

Adjust `src/scraper/scraper.ts` to modify the core scraping process. Key aspects include:

- **URL Normalization**: Ensures each page is visited only once.
- **Content Accumulation**: Appends content to `combined_documentation.md`.
- **Link Extraction**: Gathers internal links for recursive scraping.

### User Agent Configuration

Update `src/utils/markdownSaver.ts` or the relevant utility file to customize the user agent string used during scraping. This can help mimic different browsers or devices.

## Advanced Usage

### Using a Proxy

To route requests through a proxy, set the `proxyUrl` in the configuration:

```typescript
export const config = {
  // ... other settings ...
  proxyUrl: 'http://proxy.example.com:8080',
};
```

### Handling Authentication

If the target website requires authentication, you'll need to modify `src/scraper/scraper.ts` to include login steps, such as:

- Navigating to the login page
- Entering credentials
- Waiting for the login process to complete before starting the scraping

### Adjusting Depth of Scraping

The `maxDepth` parameter controls how many levels of links the scraper will follow. Set this to a higher number to scrape deeper into the site's link structure.

## Best Practices

- **Respect Robots.txt**: Always check the website's `robots.txt` file to ensure you are allowed to scrape the content.
- **Politeness Delays**: Use the `rateLimit` setting to avoid sending too many requests in a short period.
- **Legal Compliance**: Ensure you have permission to scrape and use the content from the target website.

## Troubleshooting

- **No Content Extracted**: If the scraper reports that no content was extracted from a page, verify that the selectors in `contentExtractor.ts` match the structure of the target website.
- **Blocked Requests**: If you encounter HTTP errors or blocks, consider adjusting the user agent or implementing proxy rotation.
- **Unexpected Errors**: Check the console output for error messages and stack traces to identify and fix issues.

## Contributing

Contributions are welcome! To contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/YourFeature`)
3. **Commit your changes** (`git commit -m 'Add YourFeature'`)
4. **Push to the branch** (`git push origin feature/YourFeature`)
5. **Open a pull request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

Web scraping can be subject to legal and ethical considerations. Ensure you have the right to scrape and use the content from the target website. Use this tool responsibly and comply with all applicable laws and regulations.

## Acknowledgments

- [Cheerio](https://github.com/cheeriojs/cheerio) - Fast, flexible, and lean implementation of core jQuery designed specifically for the server.
- [Puppeteer](https://github.com/puppeteer/puppeteer) - Node.js library which provides a high-level API to control Chromium over the DevTools Protocol.
- [Turndown](https://github.com/mixmark-io/turndown) - A customizable HTML to Markdown converter written in JavaScript.

## Contact

If you have any questions or need assistance, please open an [issue](https://github.com/yourusername/documentationscraper/issues) on GitHub.

---

Created with ❤️ by Builderby, 2024
