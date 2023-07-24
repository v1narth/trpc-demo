import { t } from '../trpc/context';
import tasksRouter from './tasks.routes';

const appRouter = t.router({
  tasks: tasksRouter,
});

export type AppRouter = typeof appRouter;

export default appRouter;
