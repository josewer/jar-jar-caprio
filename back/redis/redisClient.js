import { createClient } from 'redis';
import config from '../config.js';

export const redisClient = createClient({
  url: config.db.redis.url
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();
