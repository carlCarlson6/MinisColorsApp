import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from "../../../server/infrastructure/trpc/context";
import { appRouter } from "../../../server/infrastructure/trpc";

export default createNextApiHandler({
	router: appRouter,
	createContext: createContext,
});
