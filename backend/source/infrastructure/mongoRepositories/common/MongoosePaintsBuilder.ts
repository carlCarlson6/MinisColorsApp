import { Document } from "mongoose";
import { Paint } from "../../../core/entities/Paint";
import { ColorFactory } from "../../../core/services/ColorFactory";
import { CompanyName } from "../../../core/valueObjects/CompanyName";
import { PaintName } from "../../../core/valueObjects/PaintName";

export class MongoosePaintsBuilder {
    private colorFactory: ColorFactory = new ColorFactory();

    public BuildPaintsFromMongooseDocuments(documents: Document[]): Paint[] {
        let paints: Paint[] = [];

        documents.forEach(doc => {
            for(var key in doc.toJSON()) {
                if(!doc.toJSON().hasOwnProperty(key) || key == 'HexCode' || key == '_id' || doc.get(key) == '') {
                    continue;
                }

                const paint = this.BuildPaintFromMongooseDocument(key, doc);
                paints.push(paint);
            }
        });

        return paints;
    }

    public BuildPaintFromMongooseDocument(companyName: string, document: Document): Paint {
        const companyNameObjt = new CompanyName(companyName);
        const paintName = new PaintName(document.get(companyName));
        const paintColor = this.colorFactory.BuildFromHexadecial(document.get('HexCode'));
        return new Paint(companyNameObjt, paintName, paintColor);;
    }
}