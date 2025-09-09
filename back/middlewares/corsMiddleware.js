import cors from 'cors';
import config from '../config.js';

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (config.cors.validOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allow for this domain: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});
