import { Paint } from "../core/entities/Paint";

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