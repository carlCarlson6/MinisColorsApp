import { Cielab } from "./Cielab";
import { RGB } from "./RGB";

export class Hexadecimal{
    constructor(
        private readonly value: string
    ) { }

    public ToRGB(): RGB {
        const aRgbHex = this.value.match(/.{1,2}/g);

        if(!aRgbHex) {
            throw new Error(); // TODO - throw proper
        }

        return new RGB(parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16));
    }

    public ToCielab(): Cielab { return this.ToRGB().ToCielab(); }

    public ToString(): string { return this.value; }
}