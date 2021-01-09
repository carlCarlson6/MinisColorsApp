import { Cielab } from "../entities/Cielab";
import { Color } from "../entities/Color";
import { Hexadecimal } from "../entities/Hexadecimal";
import { Paint } from "../entities/Paint";
import { RGB } from "../entities/RGB";

export class ColorFactory {
    
    public BuildFromPaintsCollection(paints: Array<Paint>, hexCode: String): Color {
        const color: Color = this.BuildFromHexadecial(hexCode);
        color.Paints = paints;
        return color;
    }

    public BuildFromHexadecial(hexCode: String): Color {
        const hex: Hexadecimal = new Hexadecimal(hexCode);
        const color: Color = new Color();
        
        color.HexadecimalCode = hex;
        color.RGBCode = hex.ToRGB();
        color.CielabCode = hex.ToCielab();

        return color;
    }

    public BuildFromRGB(red: number, green: number, blue: number): Color {
        const rgb: RGB = new RGB(red, green, blue);
        const color: Color = new Color();
        
        color.HexadecimalCode = rgb.ToHex();
        color.RGBCode = rgb;
        color.CielabCode = rgb.ToCielab();

        return color;
    }

    public BuildFromCielab(lightness: number, aValue: number, bValue: number): Color {
        const cielab: Cielab = new Cielab(lightness, aValue, bValue);
        const color: Color = new Color();
        
        color.HexadecimalCode = cielab.ToHex();
        color.RGBCode = cielab.ToRGB();
        color.CielabCode = cielab;

        return color;
    }

}