import { Router } from 'express';
import { UserController } from '../controller/user-controller.js';

export const userRouter = Router();

const userController = new UserController();

userRouter.post('/login', (req, res) => userController.login(req, res));
userRouter.get('/', (req, res) => userController.get(req, res));
userRouter.get('/:id', (req, res) => userController.getById(req, res));
userRouter.post('/', (req, res) => userController.post(req, res));
userRouter.put('/:id', (req, res) => userController.put(req, res));
userRouter.delete('/:id', (req, res) => userController.delete(req, res));
