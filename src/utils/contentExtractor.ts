import TurndownService from 'turndown';
import { CheerioAPI } from 'cheerio';

export async function extractContent($: CheerioAPI): Promise<string> {
  const turndownService = new TurndownService();

  $('script, style, nav, footer').remove();

  const content = $('body').html() || '';

  return turndownService.turndown(content);
}
