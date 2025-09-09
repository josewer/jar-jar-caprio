import { Router } from 'express';
import { AuthController } from '../controller/auth-controller.js';

export const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', (req, res) => authController.login(req, res));
authRouter.get('/session', (req, res) => authController.session(req, res));
authRouter.delete('/logout', (req, res) => authController.logout(req, res));
