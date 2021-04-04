import { injectable } from "inversify";
import { Document } from "mongoose";
import { Color } from "../../core/entities/Color";
import { Paint } from "../../core/entities/Paint";
import { PaintsRepository } from "../../core/services/PaintsRepository";
import { PaintName } from "../../core/valueObjects/PaintName";
import { MongooseDbConnector } from "./common/MongooseDbConnector";
import { MongoosePaintsBuilder } from "./common/MongoosePaintsBuilder";
import { PaintMongooseModel } from "./models/PaintMongooseModel";

@injectable()
export class PaintsMongoRepository implements PaintsRepository {
    private dbConnector: MongooseDbConnector = new MongooseDbConnector();
    private paintsBuilder: MongoosePaintsBuilder = new MongoosePaintsBuilder();

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
    
    public async ReadByName(name: PaintName): Promise<Array<Paint>> {
        const allPaints: Array<Paint> = await this.ReadAll();
        const paintsByName: Array<Paint> = allPaints.filter(paint => paint.Name.toLowerCase().includes(name.Value.toLowerCase()));
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