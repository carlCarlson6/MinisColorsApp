import { createRouter } from "./context";
import { z } from "zod";

const helloSchema = z.object({text: z.string().nullish()}).nullish();

export const exampleRouter = createRouter().query("hello", {
	input: helloSchema,
	resolve: ({ input }) => ({ greeting: `Hello ${input?.text ?? "world"}`})
});
