import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const procedure = t.procedure;
export default t;
