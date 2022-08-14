import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolver";
import { getPaintsCollection } from "../mongo/mongo-db-connector";

export const bootstrap = async () => {
    const paintsCollection = await getPaintsCollection();
    
    Container.set({ id: "paints-collection", factory: () => paintsCollection });

    const schema = await buildSchema({
        resolvers,
        container: Container,
    });

    const server = new ApolloServer({
        schema: schema
    });

    const { url } = await server.listen(process.env.PORT || 4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
};