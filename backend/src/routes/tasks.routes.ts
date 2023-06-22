import { Router } from 'express';
import taskController from '../controllers/tasks.controller';

const tasksRoutes = Router();

tasksRoutes.get('/', taskController.list);
tasksRoutes.get('/:id', taskController.get);
tasksRoutes.post('/', taskController.create);
tasksRoutes.put('/:id', taskController.update);
tasksRoutes.delete('/:id', taskController.delete);

export default tasksRoutes;
