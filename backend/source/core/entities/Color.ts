import { Cielab } from "../valueObjects/Cielab";
import { Hexadecimal } from "../valueObjects/Hexadecimal";
import { RGB } from "../valueObjects/RGB";

export class Color {
    public HexadecimalCode: Hexadecimal;
    public RGBCode: RGB;
    public CielabCode: Cielab;

    public Distance(color: Color): number {
        return this.CielabCode.CalculateCie94Distance(color.CielabCode);
    }

}