import { Document } from "mongoose";
import { CompanyName } from "../../../../colorSystem/CompanyName";
import { PaintName } from "../../../../colorSystem/PaintName";
import { Paint } from "../../../../Paint";
import { ColorFactory } from "../../../ColorFactory";
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