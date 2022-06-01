import { Cielab } from "../valueObjects/Cielab";
import { Hexadecimal } from "../valueObjects/Hexadecimal";
import { RGB } from "../valueObjects/RGB";

export class Color {
    constructor(
        readonly HexadecimalCode: Hexadecimal,
        readonly RGBCode: RGB,
        readonly CielabCode: Cielab,
    ) { }

    public Distance(color: Color): number {
        return this.CielabCode.CalculateCie94Distance(color.CielabCode);
    }

    public Equals(color: Color) {
        return this.HexadecimalCode.ToString() == color.HexadecimalCode.ToString();
    }
}
