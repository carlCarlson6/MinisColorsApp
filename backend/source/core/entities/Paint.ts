import { CompanyName } from "../valueObjects/CompanyName";
import { PaintName } from "../valueObjects/PaintName";
import { Color } from "./Color";

export class Paint {
    public Company: string;
    public Name: string;
    public Color: Color;

    constructor(companyName: CompanyName, paintName: PaintName, color: Color) {
        this.Company = companyName.Value;
        this.Name = paintName.Value;
        this.Color = color;
    }

}
