import mongoose from 'mongoose';

export class MongooseDbConnector {
    private connectiorStr;

    constructor() {
        this.connectiorStr = process.env.MONGODB as string;
    }

    public async Connect(): Promise<void> {
        try {
            await mongoose.connect(this.connectiorStr, {
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
