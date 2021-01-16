import { Color } from "../core/entities/Color";
import { Paint } from "../core/entities/Paint";
import { IPaintsRepository } from "../core/services/IPaintsRepository";
import { PaintMongooseModel } from "./models/PaintMongooseModel";
import { MongooseConnector } from "./MongooseConnector";

export class PaintsMongoRepository implements IPaintsRepository {
    private dbConnector: MongooseConnector = new MongooseConnector();

    async ReadAll(): Promise<Paint[] > {
        await this.dbConnector.Connect();

        const documents = await PaintMongooseModel.find();

        await this.dbConnector.Disconnect();
        throw new Error("Method not implemented.");
    }
    
    async ReadByColor(color: Color): Promise<Paint[]> {
        await this.dbConnector.Connect();

        await this.dbConnector.Disconnect();
        throw new Error("Method not implemented.");
    }
    
    async ReadByName(name: String): Promise<Paint> {
        await this.dbConnector.Connect();

        await this.dbConnector.Disconnect();
        throw new Error("Method not implemented.");
    }

    Create(paint: Paint): Promise<number> {
        throw new Error("Method not implemented.");
    }
    Update(paint: Paint): Promise<number> {
        throw new Error("Method not implemented.");
    }
    Delete(paint: Paint): Promise<number> {
        throw new Error("Method not implemented.");
    }

}