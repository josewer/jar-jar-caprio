import { Router } from 'express';
import { AuthController } from '../controller/auth-controller.js';

export const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', (req, res) => authController.login(req, res));
