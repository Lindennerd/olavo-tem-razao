import { olavosMindRouter } from "./olavosMind";
import { createRouter } from "./context";
import superjson from "superjson";

import { generateRouter } from "./generator";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("conspiracies.", olavosMindRouter)
  .merge("generator.", generateRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
