import { z } from 'zod';
import prisma from '../lib/prisma';
import { Context } from '../trpc/context';

const taskController = {
  /**
   * List all tasks
   */
  list: async ({ ctx }: { ctx: Context }) => {
    return await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        content: true,
      },
    });
  },

  /**
   * Get a task by id
   */
  get: async ({ ctx, input }: { ctx: Context; input: GetTaskInput }) => {
    return await prisma.task.findUnique({
      where: {
        id: Number(input.taskId),
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
  },

  /**
   * Create a new task
   */
  create: async ({ ctx, input }: { ctx: Context; input: CreateTaskInput }) => {
    return await prisma.task.create({
      data: input,
    });
  },

  /**
   * Update a task
   */
  update: async ({ ctx }: { ctx: Context }) => {
    const { id } = ctx.req.params;
    const { title, content } = ctx.req.body;

    return await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    });
  },

  /**
   * Delete a task
   */
  delete: async ({ ctx, input }: { ctx: Context; input: DeleteTaskInput }) => {
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

type CreateTaskInput = z.infer<typeof createTaskInputSchema>;
type GetTaskInput = z.infer<typeof getTaskInputSchema>;
type DeleteTaskInput = z.infer<typeof deleteTaskInputSchema>;
