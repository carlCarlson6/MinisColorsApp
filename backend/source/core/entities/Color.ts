import { Cielab } from "./Cielab";
import { Hexadecimal } from "./Hexadecimal";
import { RGB } from "./RGB";

export class Color {
    public HexadecimalCode: Hexadecimal;
    public RGBCode: RGB;
    public CielabCode: Cielab;

    public Distance(color: Color): number {
        return this.CielabCode.CalculateCie94Distance(color.CielabCode);
    }

}