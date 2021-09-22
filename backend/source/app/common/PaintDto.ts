import { Paint } from "../../core/entities/Paint";

export class PaintDto {
    public get Company(): string {
        return this.company;
    }
    public get Name(): string {
        return this.name;
    }
    public get HexColorCode(): string {
        return this.hexColorCode;
    }

    private company: string;
    private name: string;
    private hexColorCode: string;
    
    constructor(paint: Paint) { 
        this.company = paint.Company;
        this.name = paint.Name;
        this.hexColorCode = paint.Color.HexadecimalCode.Value;
    }

}
