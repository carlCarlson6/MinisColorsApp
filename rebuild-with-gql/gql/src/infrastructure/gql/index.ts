import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { ApolloServer } from "apollo-server";
import { resolvers } from "../../paints-finder/infrastructure/gql/resolvers";
import { buildUseCases } from "../../paints-finder/infrastructure/bootstrap-use-cases";
import { errorFormatter } from "./error-formatter";
import { middlewares } from "./middlewares";

export const bootstrapGQL = async () => {
    const { all, byName, byNearestColor } = await buildUseCases();

    Container.set({ id: "all-paints", factory: () => all });
    Container.set({ id: "paints-by-name", factory: () => byName });
    Container.set({ id: "paints-by-nearest", factory: () => byNearestColor });

    const schema = await buildSchema({
        resolvers,
        container: Container,
        globalMiddlewares: [...middlewares],
        emitSchemaFile: true,
    });

    const server = new ApolloServer({ 
        schema,
        formatError: errorFormatter
    });

    const { url } = await server.listen(process.env.PORT || 4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
};