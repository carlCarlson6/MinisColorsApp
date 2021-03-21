import { Document } from "mongoose";
import { Color } from "../../core/entities/Color";
import { Paint } from "../../core/entities/Paint";
import { ColorFactory } from "../../core/services/ColorFactory";
import { CompanyName } from "../../core/valueObjects/CompanyName";
import { PaintName } from "../../core/valueObjects/PaintName";

export class PaintsBuilder {
    private colorFactory: ColorFactory = new ColorFactory();

    public BuildPaintsFromMongooseDocuments(documents: Array<Document>): Array<Paint> {
        let paints: Array<Paint> = [];

        documents.forEach(doc => {
            for(var key in doc.toJSON()) {
                if(doc.toJSON().hasOwnProperty(key)) {
                    if(key == 'HexCode' || key == '_id' || doc.get(key) == '') {
                        continue;
                    }
                    const paint: Paint = this.BuildPaintFromMongooseDocument(key, doc);
                    paints.push(paint);
                }
            }
        });

        return paints;
    }

    public BuildPaintFromMongooseDocument(companyName: string, document: Document): Paint {
        const companyNameObjt = new CompanyName(companyName);
        const paintName: PaintName = new PaintName(document.get(companyName));
        const paintColor: Color = this.colorFactory.BuildFromHexadecial(document.get('HexCode'));

        return new Paint(companyNameObjt, paintName, paintColor);;
    }

}