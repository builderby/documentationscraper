import { rateLimit } from 'express-rate-limit';
import { config } from '../config/config';

const limiter = rateLimit({
  windowMs: config.rateLimit,
  max: 1,
});

export async function politeRequest(url: string): Promise<Response> {
  await new Promise(resolve => limiter({} as any, {} as any, resolve as any));
  return fetch(url);
}
