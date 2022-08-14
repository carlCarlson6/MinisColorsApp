import { Cielab } from "./cielab";
import { Hexadecimal } from "./hexadecimal";
import { RGB } from "./rgb";

export class Color {
    constructor(
        readonly HexadecimalCode: Hexadecimal,
        readonly RGBCode: RGB,
        readonly CielabCode: Cielab,
    ) { }

    public distance(color: Color): number {
        return this.CielabCode.calculateCie94Distance(color.CielabCode);
    }

    public equals(color: Color) {
        return this.HexadecimalCode.ToString() == color.HexadecimalCode.ToString();
    }

    public static buildFromHexadecimal(hexCode: string) {
        const hex = new Hexadecimal(hexCode);
        return new Color(hex, hex.ToRGB(), hex.ToCielab());
    }
}