import { injectable } from "inversify";
import { Document } from "mongoose";
import { Color } from "../../core/entities/Color";
import { Paint } from "../../core/entities/Paint";
import { PaintsRepository } from "../../core/services/repositories/PaintsRepository";
import { PaintName } from "../../core/valueObjects/PaintName";
import { MongooseDbConnector } from "./common/MongooseDbConnector";
import { MongoosePaintsBuilder } from "./common/MongoosePaintsBuilder";
import { PaintMongooseModel } from "./models/PaintMongooseModel";

@injectable()
export class PaintsMongoRepository implements PaintsRepository {
    private dbConnector: MongooseDbConnector = new MongooseDbConnector();
    private paintsBuilder: MongoosePaintsBuilder = new MongoosePaintsBuilder();

    public async ReadAll(): Promise<Paint[]> {
        console.log("connecting");
        await this.dbConnector.Connect();
        const documents = await PaintMongooseModel.find();
        await this.dbConnector.Disconnect();

        return this.paintsBuilder.BuildPaintsFromMongooseDocuments(documents);
    }
    
    public async ReadByColor(color: Color): Promise<Paint[]> {
        await this.dbConnector.Connect();
        const documents = await PaintMongooseModel.find({HexCode: color.HexadecimalCode.ToString()});
        await this.dbConnector.Disconnect();
        
        return this.paintsBuilder.BuildPaintsFromMongooseDocuments(documents);
    }
    
    public async ReadByName(name: PaintName): Promise<Paint[]> {
        const allPaints = await this.ReadAll();
        return allPaints.filter(paint => paint.Name.ToString().toLowerCase().includes(name.ToString().toLowerCase()));
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