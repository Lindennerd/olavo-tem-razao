// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { generateRouter } from "./generator";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("generator.", generateRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
