import { NextFunction, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { z } from 'zod';

const taskController = {
  /**
   * List all tasks
   */
  list: async (req: Request, res: Response) => {
    res.send(await prisma.task.findMany());
  },

  /**
   * Get a task by id
   */
  get: async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(
      await prisma.task.findUnique({
        where: {
          id: Number(id),
        },
      })
    );
  },

  /**
   * Create a new task
   */
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content } = z
        .object({
          title: z.string().min(3).max(255),
          content: z.string().min(3).max(255),
        })
        .parse(req.body);

      res.send(
        await prisma.task.create({
          data: {
            title,
            content,
          },
        })
      );
    } catch (error) {
      return next(error);
    }
  },

  /**
   * Update a task
   */
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    res.send(
      await prisma.task.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          content,
        },
      })
    );
  },

  /**
   * Delete a task
   */
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(
      await prisma.task.delete({
        where: {
          id: Number(id),
        },
      })
    );
  },
};

export default taskController;
