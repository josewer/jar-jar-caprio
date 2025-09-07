import express, { json } from 'express';
import { exercisesRouter } from './routers/exercise-router.js';
import logger from 'morgan';
import cors from 'cors';
import config from './config.js';

const app = express();
const port = config.app.port;

app.disable('x-powered-by');
app.use(json());

app.use(logger('dev'));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (config.cors.validOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allow for this domain: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  console.log(`Worker ${process.pid} atendiendo ${req.method} ${req.url}`);
  res.setHeader('X-Worker-PID', process.pid);
  next();
});

app.use('/exercises', exercisesRouter);

app.use((req, res) => {
  return res.status(404).end('<h1>Page not found<h1>');
});

export { app, port };
