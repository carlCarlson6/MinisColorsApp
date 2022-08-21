import { Cielab } from "./cielab";
import { Rgb } from "./rgb";

export type Color = {
    hexadecimal: string;
    rgb: Rgb;
    cielab: Cielab;
}
