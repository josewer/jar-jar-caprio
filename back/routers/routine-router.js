import { Router } from 'express';
import { RoutineController } from '../controller/routine-controller.js';
import { RoutineExercisesController } from '../controller/routine-exercises-controller.js';


export const routineRouter = Router();

const routineController = new RoutineController();
const routineExercisesController = new RoutineExercisesController();

routineRouter.get('/', (req, res) => routineController.get(req, res));
routineRouter.get('/:id', (req, res) => routineController.getById(req, res));
routineRouter.post('/', (req, res) => routineController.post(req, res));
routineRouter.put('/:id', (req, res) => routineController.put(req, res));
routineRouter.delete('/:id', (req, res) => routineController.delete(req, res));

routineRouter.get('/:routineId/exercises/', (req, res) => routineExercisesController.get(req, res));
routineRouter.get('/:routineId/exercises/:id', (req, res) => routineExercisesController.getById(req, res));
routineRouter.post('/:routineId/exercises/', (req, res) => routineExercisesController.post(req, res));
routineRouter.put('/:routineId/exercises/:id', (req, res) => routineExercisesController.put(req, res));
routineRouter.delete('/:routineId/exercises/:id', (req, res) => routineExercisesController.delete(req, res));
