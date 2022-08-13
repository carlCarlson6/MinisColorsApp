import { Cielab } from "./cielab";
import { RGB } from "./rgb";

export class Hexadecimal{
    constructor(
        private readonly value: string
    ) { }

    public ToRGB(): RGB {
        const aRgbHex = this.value.match(/.{1,2}/g);
        if(!aRgbHex || !aRgbHex[0] || !aRgbHex[1] || !aRgbHex[2]) throw new Error(); // TODO - throw proper
        return new RGB(parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16));
    }

    public ToCielab(): Cielab { return this.ToRGB().ToCielab(); }
    public ToString(): string { return this.value; }
}