import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { buildUseCases } from "../bootstrap-use-cases";

export const bootstrap = async () => {
    const { all, byName, byNearestColor } = await buildUseCases();

    Container.set({ id: "all-paints", factory: () => all });
    Container.set({ id: "paints-by-name", factory: () => byName });
    Container.set({ id: "paints-by-nearest", factory: () => byNearestColor });

    const schema = await buildSchema({
        resolvers,
        container: Container,
    });

    const server = new ApolloServer({ schema });

    const { url } = await server.listen(process.env.PORT || 4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
};