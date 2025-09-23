import { Router } from 'express';
import { ExerciseController } from '../controller/exercise-controller.js';

export const exercisesRouter = Router();

const exerciseController = new ExerciseController();

exercisesRouter.get('/', (req, res) => exerciseController.get(req, res));
exercisesRouter.post('/search', (req, res) => exerciseController.search(req, res));
exercisesRouter.get('/:id', (req, res) => exerciseController.getById(req, res));
exercisesRouter.post('/', (req, res) => exerciseController.post(req, res));
exercisesRouter.put('/:id', (req, res) => exerciseController.put(req, res));
exercisesRouter.delete('/:id', (req, res) => exerciseController.delete(req, res));
