import taskController, {
  createTaskInputSchema,
  deleteTaskInputSchema,
  getTaskInputSchema,
  updateTaskInputSchema,
} from '../controllers/tasks.controller';
import t, { procedure } from '../trpc';

const tasksRouter = t.router({
  list: procedure.query(taskController.list),
  get: procedure.input(getTaskInputSchema).query(taskController.get),
  create: procedure
    .input(createTaskInputSchema)
    .mutation(taskController.create),
  update: procedure
    .input(updateTaskInputSchema)
    .mutation(taskController.update),
  delete: procedure
    .input(deleteTaskInputSchema)
    .mutation(taskController.delete),
});

export default tasksRouter;
