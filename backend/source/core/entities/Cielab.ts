import { Hexadecimal } from "./Hexadecimal";
import { RGB } from "./RGB";

export class Cielab {
    public Lightness: number;
    public aAxisValue: number;
    public bAxisValue: number;

    public constructor(l: number, a: number, b: number) {
        this.Lightness = l;
        this.aAxisValue = a;
        this.bAxisValue = b;
    }

    public ToRGB(): RGB {
        let yComponent: number = (this.Lightness + 16) / 116;
        let xComponent: number = this.aAxisValue / 500 + yComponent;
        let zComponent: number = this.bAxisValue / 200;
        xComponent = 0.95047 * ((xComponent * xComponent * xComponent > 0.008856) ? xComponent * xComponent * xComponent : (xComponent - 16/116) / 7.787);
        yComponent = 1.00000 * ((yComponent * yComponent * yComponent > 0.008856) ? yComponent * yComponent * yComponent : (yComponent - 16/116) / 7.787);
        zComponent = 1.08883 * ((zComponent * zComponent * zComponent > 0.008856) ? zComponent * zComponent * zComponent : (zComponent - 16/116) / 7.787);

        let redComponent: number = xComponent *  3.2406 + yComponent * -1.5372 + zComponent * -0.4986;
        let greenComponent: number = xComponent * -0.9689 + yComponent *  1.8758 + zComponent *  0.0415;
        let blueComponent: number = xComponent *  0.0557 + yComponent * -0.2040 + zComponent *  1.0570;
        redComponent = (redComponent > 0.0031308) ? (1.055 * Math.pow(redComponent, 1/2.4) - 0.055) : 12.92 * redComponent;
        greenComponent = (greenComponent > 0.0031308) ? (1.055 * Math.pow(greenComponent, 1/2.4) - 0.055) : 12.92 * greenComponent;
        blueComponent = (blueComponent > 0.0031308) ? (1.055 * Math.pow(blueComponent, 1/2.4) - 0.055) : 12.92 * blueComponent;

        return new RGB(redComponent, greenComponent, blueComponent)
    }

    public ToHex(): Hexadecimal {
        return this.ToRGB().ToHex();
    }

    public CalculateCie94Distance(color: Cielab): number {
        throw new Error('not implemented');
    }

}