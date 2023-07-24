import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { ZodError } from 'zod';

export const createContext = (opts: trpcExpress.CreateExpressContextOptions) =>
  opts;

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      code: 400,
      message:
        error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
          ? Object.values(error.cause.flatten().fieldErrors)?.[0] || ''
          : '',
    };
  },
});
