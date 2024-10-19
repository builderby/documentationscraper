import { CheerioAPI } from 'cheerio';
import TurndownService from 'turndown';

export async function extractContent($: CheerioAPI): Promise<string> {
  const turndownService = new TurndownService();

  $('script, style').remove();

  const content: string[] = [];

  $('h1, h2, h3, h4, h5, h6, p, pre, table, ul, ol').each((i, elem) => {
    const $elem = $(elem);
    
    if ($elem.is('pre')) {
      content.push('```\n' + $elem.text() + '\n```');
    } else if ($elem.is('table') || $elem.is('ul, ol')) {
      const outerHTML = $elem.prop('outerHTML');
      if (outerHTML !== null) {
        content.push(turndownService.turndown(outerHTML));
      }
    } else {
      content.push($elem.text());
    }
  });

  return content.join('\n\n');
}
