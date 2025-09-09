import express, { json } from 'express';
import { exercisesRouter } from './routers/exercise-router.js';
import { userRouter } from './routers/user-router.js';
import { authRouter } from './routers/auth-router.js';
import logger from 'morgan';
import config from './config.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
import { workerMiddleware } from './middlewares/workerMiddleware.js';

const app = express();
const port = config.app.port;

// Middlewares globales
app.disable('x-powered-by');
app.use(cookieParser());
app.use(json());
app.use(corsMiddleware);
app.use(workerMiddleware);
app.use(logger('dev'));

// Paths
app.use('/auth', authRouter);
app.use('/exercises', authMiddleware, exercisesRouter);
app.use('/users', authMiddleware, userRouter);

// 404 handler
app.use((req, res) => { return res.status(404).json({ message: 'Page not found' }); });

export { app, port };
