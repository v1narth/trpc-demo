import Router from 'express';
import taskController from '../controllers/tasks.controller';

const tasksRouter = Router();

tasksRouter.get('/', taskController.list);
tasksRouter.get('/:taskId', taskController.get);
tasksRouter.post('/', taskController.create);
tasksRouter.put('/:taskId', taskController.update);
tasksRouter.delete('/:taskId', taskController.delete);

export default tasksRouter;
