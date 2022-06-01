import { injectable } from "inversify";
import { Document } from "mongoose";
import { Color } from "../../core/entities/Color";
import { ColorFactory } from "../../core/services/ColorFactory";
import { ColorsRepository } from "../../core/services/repositories/ColorsRepository";
import { MongooseDbConnector } from "./common/MongooseDbConnector";
import { PaintMongooseModel } from "./models/PaintMongooseModel";

@injectable()
export class ColorsMongoRepository implements ColorsRepository {
    private dbConnector: MongooseDbConnector = new MongooseDbConnector();
    private colorFactory: ColorFactory = new ColorFactory();
    
    public async ReadAll(): Promise<Color[]> {
        await this.dbConnector.Connect();
        const documents: Array<Document> = await PaintMongooseModel.find();
        await this.dbConnector.Disconnect();

        const hexCodes: Array<string> = documents.map(doc => doc.get('HexCode'));
        const uniqueHexCodes: Array<string> = [...new Set(hexCodes)];

        const colors: Array<Color> = uniqueHexCodes.map(hexCode => this.colorFactory.BuildFromHexadecial(hexCode));
        return colors;
    }
    
    async Create(color: Color): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async Read(hexCode: String): Promise<Color> {
        throw new Error("Method not implemented.");
    }
    async Update(color: Color): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async Delete(color: Color): Promise<number> {
        throw new Error("Method not implemented.");
    }

}
