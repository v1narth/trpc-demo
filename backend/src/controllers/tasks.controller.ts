import { z } from 'zod';
import prisma from '../lib/prisma';
import { Request, Response } from 'express';

const taskController = {
  /**
   * List all tasks
   */
  list: async (req: Request, res: Response) => {
    res.send(
      await prisma.task.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          isComplete: true,
        },
      })
    );
  },

  /**
   * Get a task by id
   */
  get: async (req: Request, res: Response) => {
    const input = req.params as GetTaskInput;

    res.send(
      await prisma.task.findUnique({
        where: {
          id: Number(input.taskId),
        },
        select: {
          id: true,
          title: true,
          content: true,
          isComplete: true,
          createdAt: true,
        },
      })
    );
  },

  /**
   * Create a new task
   */
  create: async (req: Request, res: Response) => {
    const input = req.body as CreateTaskInput;
    res.send(
      await prisma.task.create({
        data: input,
      })
    );
  },

  /**
   * Update a task
   */
  update: async (req: Request, res: Response) => {
    const { taskId } = req.params as UpdateTaskInput;
    const { title, content, isComplete } = req.body;

    res.send(
      await prisma.task.update({
        where: {
          id: Number(taskId),
        },
        data: {
          title,
          content,
          isComplete,
        },
      })
    );
  },

  /**
   * Delete a task
   */
  delete: async (req: Request, res: Response) => {
    const input = req.params as DeleteTaskInput;
    res.send(
      await prisma.task.delete({
        where: {
          id: Number(input.taskId),
        },
      })
    );
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
  taskId: z.string().optional(),
});

type CreateTaskInput = z.infer<typeof createTaskInputSchema>;
type GetTaskInput = z.infer<typeof getTaskInputSchema>;
type DeleteTaskInput = z.infer<typeof deleteTaskInputSchema>;
type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;
