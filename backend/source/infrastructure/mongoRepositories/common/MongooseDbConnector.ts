import mongoose from 'mongoose';
import { config as readEnvConfig } from "dotenv";

export class MongooseDbConnector {
    public async Connect(): Promise<void> {
        readEnvConfig();
        try {
            await mongoose.connect(process.env.MONGODB!, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
        } 
        catch(error) {
            console.error("error when connecting to db");
            console.error(error);
            throw error;
        }
    }

    public async Disconnect(): Promise<void> {
        await mongoose.disconnect();
    }
}