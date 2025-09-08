import express, { json } from 'express';
import { exercisesRouter } from './routers/exercise-router.js';
import { userRouter } from './routers/user-router.js';
import logger from 'morgan';
import cors from 'cors';
import config from './config.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
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
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use((req, res, next) => {
  console.log(`Worker ${process.pid} atendiendo ${req.method} ${req.url}`);
  res.setHeader('X-Worker-PID', process.pid);
  next();
});

// Middleware de protección
function authMiddleware (req, res, next) {
  let token = req.cookies?.token || req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No autenticado' });

  if (token.startsWith('Bearer ')) { token = token.substring(7); }

  try {
    const decoded = jwt.verify(token, config.app.secret_jwt_key);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
}

app.use('/exercises', authMiddleware, exercisesRouter);
app.use('/users', userRouter);

app.use((req, res) => {
  return res.status(404).end('<h1>Page not found<h1>');
});

export { app, port };
