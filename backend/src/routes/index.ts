import t from '../trpc';
import tasksRouter from './tasks.routes';

const router = t.router({
  tasks: tasksRouter,
});

export type AppRouter = typeof router;

export default router;
