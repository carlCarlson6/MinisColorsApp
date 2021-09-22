import { Cielab } from "./Cielab";
import { RGB } from "./RGB";

export class Hexadecimal{
    public readonly Value: string;

    constructor(code: string) {
        this.Value = code;
    }

    public ToRGB(): RGB {
        const aRgbHex: RegExpMatchArray | null = this.Value.match(/.{1,2}/g);

        if(!aRgbHex) {
            throw new Error();
        }

        const red: number = parseInt(aRgbHex[0], 16);
        const green: number = parseInt(aRgbHex[1], 16);
        const blue: number = parseInt(aRgbHex[2], 16);
        return new RGB(red, green, blue);
    }

    public ToCielab(): Cielab {
        return this.ToRGB().ToCielab();
    }

}
