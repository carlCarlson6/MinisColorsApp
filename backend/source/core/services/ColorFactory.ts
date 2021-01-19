import { Cielab } from "../valueObjects/Cielab";
import { Color } from "../entities/Color";
import { Hexadecimal } from "../valueObjects/Hexadecimal";
import { RGB } from "../valueObjects/RGB";

export class ColorFactory {
    
    public BuildFromHexadecial(hexCode: string): Color {
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