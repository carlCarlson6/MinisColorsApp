import { injectable } from "inversify";
import { Document } from "mongoose";
import { Color } from "../core/entities/Color";
import { Paint } from "../core/entities/Paint";
import { ColorFactory } from "../core/services/ColorFactory";
import { IPaintsRepository } from "../core/services/IPaintsRepository";
import { PaintMongooseModel } from "./models/PaintMongooseModel";
import { MongooseConnector } from "./MongooseConnector";

@injectable()
export class PaintsMongoRepository implements IPaintsRepository {
    private dbConnector: MongooseConnector = new MongooseConnector();

    async ReadAll(): Promise<Array<Paint>> {
        let allPaints: Array<Paint> = [];
        await this.dbConnector.Connect();

        const documents: Array<Document> = await PaintMongooseModel.find();
        documents.forEach(doc => {
            for(var key in doc.toJSON()) {
                if(doc.toJSON().hasOwnProperty(key)) {
                    if(key == 'HexCode' || key == '_id' || doc.get(key) == '') {
                        continue;
                    }
                    const paint: Paint = new Paint(key, doc.get(key), new ColorFactory().BuildFromHexadecial(doc.get('HexCode')));
                    allPaints.push(paint);
                }
            }
        });
        await this.dbConnector.Disconnect();

        return allPaints;
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