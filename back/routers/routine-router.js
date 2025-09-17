import { Router } from 'express';
import { RoutineController } from '../controller/routine-controller.js';

export const routineRouter = Router();

const routineController = new RoutineController();

routineRouter.get('/', (req, res) => routineController.get(req, res));
routineRouter.get('/:id', (req, res) => routineController.getById(req, res));
routineRouter.post('/', (req, res) => routineController.post(req, res));
routineRouter.put('/:id', (req, res) => routineController.put(req, res));
routineRouter.delete('/:id', (req, res) => routineController.delete(req, res));
