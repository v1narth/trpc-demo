import taskController, {
  createTaskInputSchema,
  deleteTaskInputSchema,
  getTaskInputSchema,
} from '../controllers/tasks.controller';
import { t } from '../trpc/context';

const tasksRouter = t.router({
  list: t.procedure.query(taskController.list),
  create: t.procedure
    .input(createTaskInputSchema)
    .mutation(taskController.create),
  get: t.procedure.input(getTaskInputSchema).query(taskController.get),
  update: t.procedure.mutation(taskController.update),
  delete: t.procedure
    .input(deleteTaskInputSchema)
    .mutation(taskController.delete),
});

export default tasksRouter;
