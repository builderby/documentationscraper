# Documentation Scraper

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

## Features

- Crawls documentation websites and extracts content
- Respects robots.txt rules and implements polite scraping practices
- Uses parallel scraping for improved performance
- Converts HTML to Markdown with support for various content types:
  - Text
  - Code blocks
  - Images (with proper formatting)
  - Tables
  - Lists (ordered and unordered)
- Provides source attribution for each scraped page
- Generates a comprehensive table of contents for easy navigation
- Uses realistic user agents to avoid detection
- Implements rate limiting and politeness delays
- Supports proxy usage for distributed scraping

## Prerequisites

- Node.js (v18.16.0 or later)
- npm (v9.5.1 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/builderby/documentationscraper.git
   cd documentationscraper
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

Edit the `src/config/config.ts` file to customize the scraper's behavior:

- `maxDepth`: Maximum depth of links to follow (default: 10)
- `contentTypes`: Types of content to extract (default: ['text', 'code', 'images', 'tables', 'lists'])
- `rateLimit`: Delay between requests in milliseconds (default: 1000)
- `outputDir`: Directory to save scraped content (default: './output')
- `proxyUrl`: URL of proxy server (optional) - leave undefined to disable proxy

Example configuration:

```typescript
export const config = {
  maxDepth: 5,
  contentTypes: ['text', 'code', 'images'],
  rateLimit: 2000,
  outputDir: './docs',
  proxyUrl: 'http://proxy.example.com:8080',
};
```

## Usage

1. Set the starting URL in `src/index.ts`:
   ```typescript
   const startUrl = 'https://example.com/docs';
   ```

2. Run the scraper:
   ```
   npm start
   ```

The scraper will create a folder structure in the `outputDir` based on the URL structure of the scraped website. Each page will be saved as a Markdown file, and a table of contents will be generated for each directory.

## Output Structure

```
output/
├── example.com/
│   ├── docs/
│   │   ├── getting-started.md
│   │   ├── api-reference.md
│   │   ├── advanced-topics/
│   │   │   ├── security.md
│   │   │   └── performance.md
│   └── table_of_contents.md
```

## Customization

- Content Extraction: Modify `src/utils/contentExtractor.ts` to change how content is extracted and processed.
- File Saving: Update `src/utils/markdownSaver.ts` to alter how files are saved or named.
- Scraping Process: Adjust `src/scraper/scraper.ts` to modify the core scraping logic.
- Parallel Scraping: Fine-tune `src/scraper/parallelScraper.ts` for parallel processing settings.

## Advanced Usage

### Using a Proxy

To use a proxy, set the `proxyUrl` in the configuration file. This can help bypass rate limits or access geo-restricted content.

### Handling Authentication

For sites requiring authentication, you may need to modify the `scraper.ts` file to include login logic before scraping.

### Custom Content Processing

Implement custom content processing by adding new functions to `contentExtractor.ts` and updating the `extractContent` function to use them.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

Web scraping may be against the terms of service of some websites. Always ensure you have permission to scrape a website and use the data responsibly. This tool is intended for educational purposes and should be used ethically and in compliance with all applicable laws and website policies.

## Acknowledgments

- [Cheerio](https://github.com/cheeriojs/cheerio) for HTML parsing
- [Puppeteer](https://github.com/puppeteer/puppeteer) for headless browser automation
- [TurndownJS](https://github.com/domchristie/turndown) for HTML to Markdown conversion

## Support

If you have any questions or need help, please open an [issue](https://github.com/builderby/documentationscraper/issues) on GitHub.

---

Created with ❤️ by Builderby, 2024
