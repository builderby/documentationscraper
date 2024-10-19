import robotsParser from 'robots-parser';
import fetch from 'node-fetch';
import { config } from '../config/config';

export async function checkRobotsTxt(url: string): Promise<boolean> {
  const robotsUrl = new URL('/robots.txt', url).toString();
  const response = await fetch(robotsUrl);
  const robotsTxt = await response.text();
  const robots = robotsParser(robotsUrl, robotsTxt);

  return robots.isAllowed(url, config.userAgent) ?? false;
}
