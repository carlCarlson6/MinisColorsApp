import { injectable } from "inversify";
import { Color } from "../../../colorSystem/Color";
import { PaintName } from "../../../colorSystem/PaintName";
import { Paint } from "../../../Paint";
import { PaintsRepository } from "../../PaintsRepository";
import { MongooseDbConnector } from "./common/MongooseDbConnector";
import { MongoosePaintsBuilder } from "./common/MongoosePaintsBuilder";
import { PaintMongooseModel } from "./models/PaintMongooseModel";

@injectable()
export class PaintsMongoRepository implements PaintsRepository {
    private dbConnector = new MongooseDbConnector();
    private paintsBuilder = new MongoosePaintsBuilder();

    public async ReadAll(): Promise<Paint[]> {
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