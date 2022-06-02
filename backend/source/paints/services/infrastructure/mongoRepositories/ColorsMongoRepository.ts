import { injectable } from "inversify";
import { Color } from "../../../colorSystem/Color";
import { ColorFactory } from "../../ColorFactory";
import { ColorsRepository } from "../../ColorsRepository";
import { MongooseDbConnector } from "./common/MongooseDbConnector";
import { PaintMongooseModel } from "./models/PaintMongooseModel";

@injectable()
export class ColorsMongoRepository implements ColorsRepository {
    private dbConnector = new MongooseDbConnector();
    private colorFactory = new ColorFactory();
    
    public async ReadAll(): Promise<Color[]> {
        await this.dbConnector.Connect();
        const documents = await PaintMongooseModel.find();
        await this.dbConnector.Disconnect();

        const hexCodes = documents.map(doc => doc.get('HexCode'));
        const uniqueHexCodes = [...new Set(hexCodes)];

        return uniqueHexCodes.map(hexCode => this.colorFactory.BuildFromHexadecial(hexCode));
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
