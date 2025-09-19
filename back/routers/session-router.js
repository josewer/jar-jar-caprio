import { Router } from 'express';
import { SessionController } from '../controller/session-controller.js';
import { ExerciseDoneController } from '../controller/exercise-done-controller.js';


export const sessionRouter = Router();

const sessionController = new SessionController();
const exerciseDoneController = new ExerciseDoneController();


sessionRouter.get('/', (req, res) => sessionController.get(req, res));
sessionRouter.get('/:id', (req, res) => sessionController.getById(req, res));
sessionRouter.post('/', (req, res) => sessionController.post(req, res));
sessionRouter.post('/start', (req, res) => sessionController.start(req, res));
sessionRouter.put('/:id', (req, res) => sessionController.put(req, res));
sessionRouter.put('/finished/:id', (req, res) => sessionController.finished(req, res));
sessionRouter.delete('/:id', (req, res) => sessionController.delete(req, res));


sessionRouter.get('/:sessionId/exercise-done', (req, res) => exerciseDoneController.get(req, res));
sessionRouter.get('/:sessionId/exercise-done/:id', (req, res) => exerciseDoneController.getById(req, res));
sessionRouter.post('/:sessionId/exercise-done/', (req, res) => exerciseDoneController.post(req, res));
sessionRouter.put('/:sessionId/exercise-done/:id', (req, res) => exerciseDoneController.put(req, res));
sessionRouter.delete('/:sessionId/exercise-done/:id', (req, res) => exerciseDoneController.delete(req, res));