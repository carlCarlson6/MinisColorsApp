import { Collection, MongoClient } from "mongodb";
import { PaintsMongoModel } from "./paints-mongo-model";

export type GetPaintsCollection = () => Promise<Collection<PaintsMongoModel>>;

export const getPaintsCollection: GetPaintsCollection = async () => {
    const client = new MongoClient(process.env.MONGODB!);
    await client.connect();
    const db = client.db("MinisColorAppDB");
    return db.collection<PaintsMongoModel>("Paints");
};