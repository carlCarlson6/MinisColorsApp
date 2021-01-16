import mongoose from 'mongoose';

export class MongooseConnector {
    private connectiorStr: string;

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
    
            console.log('connected to db')
        } 
        catch(error) {
            console.log(error);
        }
    }

    public async Disconnect(): Promise<void> {
        await mongoose.disconnect();
    }

}