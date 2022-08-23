import { MongoClient } from "mongodb";
import { PaintsCollection, PaintsMongoModel } from "./paints-mongo-model";

export type GetPaintsCollection = () => Promise<PaintsCollection>;

export const getPaintsCollection: GetPaintsCollection = async () => {
    const client = new MongoClient(process.env.MONGODB!);
    await client.connect();
    const db = client.db("MinisColorAppDB");
    return db.collection<PaintsMongoModel>("Paints");
};