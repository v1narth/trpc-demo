import { z } from 'zod';
import prisma from '../lib/prisma';

const taskController = {
  /**
   * List all tasks
   *
   */
  list: async () => {
    return await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        isComplete: true,
      },
    });
  },

  /**
   * Get a task by id
   *
   */
  get: async ({ input }: { input: GetTaskInput }) => {
    return await prisma.task.findUnique({
      where: {
        id: Number(input.taskId),
      },
      select: {
        id: true,
        title: true,
        content: true,
        isComplete: true,
      },
    });
  },

  /**
   * Create a new task
   */
  create: async ({ input }: { input: CreateTaskInput }) => {
    return await prisma.task.create({
      data: input,
    });
  },

  /**
   * Update a task
   */
  update: async ({ input }: { input: UpdateTaskInput }) => {
    const { id, title, content, isComplete } = input;
    return await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        isComplete,
      },
    });
  },

  /**
   * Delete a task
   */
  delete: async ({ input }: { input: DeleteTaskInput }) => {
    return await prisma.task.delete({
      where: {
        id: Number(input.taskId),
      },
    });
  },
};

export default taskController;

export const createTaskInputSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(3).max(255),
});

export const getTaskInputSchema = z.object({
  taskId: z.string().optional(),
});

export const deleteTaskInputSchema = z.object({
  taskId: z.string().optional(),
});

export const updateTaskInputSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3).max(255).optional(),
  content: z.string().min(3).max(255).optional(),
  isComplete: z.boolean().optional(),
});

type CreateTaskInput = z.infer<typeof createTaskInputSchema>;
type GetTaskInput = z.infer<typeof getTaskInputSchema>;
type DeleteTaskInput = z.infer<typeof deleteTaskInputSchema>;
type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;
