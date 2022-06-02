import { Cielab } from "./Cielab";
import { Hexadecimal } from "./Hexadecimal";
import { RGB } from "./RGB";

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
