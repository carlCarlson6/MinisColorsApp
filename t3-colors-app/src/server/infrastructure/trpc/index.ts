import { createRouter } from "./context";
import superjson from "superjson";


import { exampleRouter } from "./example";
import { paintsRouter } from "./paints-router";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("paints.", paintsRouter)
	.merge("example.", exampleRouter);

export type AppRouter = typeof appRouter;