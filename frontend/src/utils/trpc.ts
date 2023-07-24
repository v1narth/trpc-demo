import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../backend/src/routes';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

const trpc = createTRPCReact<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export default trpc;
