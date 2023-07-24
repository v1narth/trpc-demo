import Router from 'express';
import tasksRouter from './tasks.routes';

const router = Router();

router.use('/tasks', tasksRouter);

export default router;
