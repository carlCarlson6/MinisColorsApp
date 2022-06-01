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
    constructor(
        private readonly company: string,
        private readonly name: string,
        private readonly hexColorCode: string,
    ) {}

    public static FromPaint(paint: Paint): PaintDto {
        return new PaintDto(paint.Company.ToString(), paint.Name.ToString(), paint.Color.HexadecimalCode.ToString());
    }

    public static FromPaints(paints: Paint[]): PaintDto[] {
        return paints.map(paint => this.FromPaint(paint));
    }
}