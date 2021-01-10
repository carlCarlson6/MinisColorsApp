import { Color } from "./Color";

export class Paint {
    public Company: String;
    public Name: String;
    public Color: Color;

    constructor(companyName: String, paintName: String) {
        this.Company = companyName;
        this.Name = paintName;
    }

} 