import { Color } from "./colorSystem/Color";
import { CompanyName } from "./colorSystem/CompanyName";
import { PaintName } from "./colorSystem/PaintName";

export class Paint {
    constructor(
        readonly Company: CompanyName, 
        readonly Name: PaintName, 
        readonly Color: Color
    ) { }
}

export class PaintDto {
    constructor(
        readonly Company: string,
        readonly Name: string,
        readonly HexColorCode: string,
    ) { }

    public static FromPaint(paint: Paint): PaintDto {
        return new PaintDto(paint.Company.ToString(), paint.Name.ToString(), paint.Color.HexadecimalCode.ToString());
    }

    public static FromPaints(paints: Paint[]): PaintDto[] {
        return paints.map(paint => this.FromPaint(paint));
    }
}