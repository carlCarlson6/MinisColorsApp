import mongoose from 'mongoose';
import { config as readEnvConfig } from "dotenv";

export class MongooseDbConnector {
    public async Connect(): Promise<void> {
        readEnvConfig();
        console.log(process.env.MONGODB!);
        try {
            await mongoose.connect(process.env.MONGODB!, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
        } 
        catch(error) {
            console.log(error);
            throw error;
        }
    }

    public async Disconnect(): Promise<void> {
        await mongoose.disconnect();
    }
}