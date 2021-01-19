import { injectable } from "inversify";
import { Document } from "mongoose";
import { Color } from "../core/entities/Color";
import { Paint } from "../core/entities/Paint";
import { IPaintsRepository } from "../core/services/IPaintsRepository";
import { PaintMongooseModel } from "./models/PaintMongooseModel";
import { MongooseDbConnector } from "./common/MongooseDbConnector";
import { PaintsBuilder } from "./common/PaintsBuilder";

@injectable()
export class PaintsMongoRepository implements IPaintsRepository {
    private dbConnector: MongooseDbConnector = new MongooseDbConnector();
    private paintsBuilder: PaintsBuilder = new PaintsBuilder();

    public async ReadAll(): Promise<Array<Paint>> {
        await this.dbConnector.Connect();
        const documents: Array<Document> = await PaintMongooseModel.find();
        await this.dbConnector.Disconnect();

        const allPaints: Array<Paint> = this.paintsBuilder.BuildPaintsFromMongooseDocuments(documents);
        return allPaints;
    }
    
    public async ReadByColor(color: Color): Promise<Array<Paint>> {
        await this.dbConnector.Connect();
        const documents: Array<Document> = await PaintMongooseModel.find({HexCode: color.HexadecimalCode.Value});
        await this.dbConnector.Disconnect();
        
        const paintsWithColor: Array<Paint> = this.paintsBuilder.BuildPaintsFromMongooseDocuments(documents);
        return paintsWithColor;
    }
    
    public async ReadByName(name: String): Promise<Array<Paint>> {
        const allPaints: Array<Paint> = await this.ReadAll();
        const paintsByName: Array<Paint> = allPaints.filter(paint => paint.Name == name);
        if(paintsByName.length == 0) {
            return [];
        }

        return paintsByName;
    }

    public async Create(paint: Paint): Promise<number> {
        throw new Error("Method not implemented.");
    }
    public async Update(paint: Paint): Promise<number> {
        throw new Error("Method not implemented.");
    }
    public async Delete(paint: Paint): Promise<number> {
        throw new Error("Method not implemented.");
    }

}