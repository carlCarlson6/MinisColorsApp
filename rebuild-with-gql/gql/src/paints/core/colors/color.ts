import { Cielab } from "./cielab";
import { Hexadecimal } from "./hexadecimal";
import { RGB } from "./rgb";

export class Color {
    constructor(
        readonly hexadecimal: Hexadecimal,
        readonly rgb: RGB,
        readonly cielab: Cielab,
    ) { }

    public distance(color: Color): number {
        return this.cielab.calculateCie94Distance(color.cielab);
    }

    public equals(color: Color) {
        return this.hexadecimal.value == color.hexadecimal.value;
    }

    public static buildFromHexadecimal(hexCode: string) {
        const hex = new Hexadecimal(hexCode);
        return new Color(hex, hex.ToRGB(), hex.ToCielab());
    }
}