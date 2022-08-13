import { Collection } from "mongodb";
import { PaintsMongoModel } from "./paints-mongo-model";
import { MongoClient } from "mongodb";

export interface MongoContext {
    feeds: Collection<PaintsMongoModel>
}

export interface IMongoDbConnector {
    Connect(): Promise<MongoContext>;
    TestConnection(): Promise<void>;
}

export class MongoDbConnector implements IMongoDbConnector {
    async TestConnection(): Promise<void> {
        const client = new MongoClient(process.env.MONGODB!);
        await client.connect();
        await client.close();
    }

    async Connect(): Promise<MongoContext> {
        const client = new MongoClient(process.env.MONGODB!);
        await client.connect();
            
        const db = client.db(process.env.MONGODB!);
        const feedsCollection = db.collection<PaintsMongoModel>(process.env.MONGODB!);
    
        return {
            feeds: feedsCollection
        };
    }
}

export type GetPaintsCollection = () => Promise<Collection<PaintsMongoModel>>;

export const getPaintsCollection: GetPaintsCollection = async () => {
    const client = new MongoClient(process.env.MONGODB!);
    await client.connect();
    const db = client.db("MinisColorAppDB");
    return db.collection<PaintsMongoModel>("Paints");
};