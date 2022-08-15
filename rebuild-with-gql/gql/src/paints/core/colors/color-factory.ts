import { Cielab } from "./cielab";
import { Color } from "./color";
import { Hexadecimal } from "./hexadecimal";
import { RGB } from "./rgb";

// TODO - refactor
export class ColorFactory {
    
    public BuildFromHexadecial(hexCode: string): Color {
        const hex = new Hexadecimal(hexCode);
        return new Color(hex, hex.ToRGB(), hex.ToCielab());
    }

    public BuildFromRGB(red: number, green: number, blue: number): Color {
        const rgb = new RGB(red, green, blue);
        return new Color(rgb.ToHex(), rgb, rgb.ToCielab());
    }

    public BuildFromCielab(lightness: number, aValue: number, bValue: number): Color {
        const cielab = new Cielab(lightness, aValue, bValue);
        return new Color(cielab.toHex(), cielab.toRGB(), cielab);
    }
}