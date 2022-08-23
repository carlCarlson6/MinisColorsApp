import { Cielab } from "./cielab";
import { Color } from "./color";
import { Hexadecimal } from "./hexadecimal";
import { RGB } from "./rgb";

export type ColorBuilder<T> = (input: T) => Color;

export const buildFromHexadecial: ColorBuilder<{hexCode: string}> = ({hexCode}) => {
    const hex = new Hexadecimal(hexCode);
    return new Color(hex, hex.ToRGB(), hex.ToCielab());
}

export const buildFromRgb: ColorBuilder<{red: number, green: number, blue: number}> = ({red, blue, green}) => {
    const rgb = new RGB(red, green, blue);
    return new Color(rgb.ToHex(), rgb, rgb.ToCielab());
}

export const buildFromCielab: ColorBuilder<{lightness: number, aValue: number, bValue: number}> = ({lightness, aValue, bValue}) => {
    const cielab = new Cielab(lightness, aValue, bValue);
    return new Color(cielab.toHex(), cielab.toRGB(), cielab);
}

export const colorFactory = { buildFromHexadecial, buildFromRgb, buildFromCielab }