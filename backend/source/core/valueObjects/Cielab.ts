import { Hexadecimal } from "./Hexadecimal";
import { RGB } from "./RGB";

export class Cielab {
    public readonly Lightness: number;
    public readonly aAxisValue: number;
    public readonly bAxisValue: number;

    public constructor(l: number, a: number, b: number) {
        this.Lightness = l;
        this.aAxisValue = a;
        this.bAxisValue = b;
    }

    public ToRGB(): RGB {
        const [xComponent, yComponent, zComponent] = this.CalculateXYZComponentsFromLABComponents();
        const [redComponent, greenComponent, blueComponent] = this.CalculateRGBComponentsFromXYZComponents(xComponent, yComponent, zComponent);

        return new RGB(redComponent, greenComponent, blueComponent)
    }

    private CalculateXYZComponentsFromLABComponents(): [number, number, number] {
        let yComponent: number = (this.Lightness + 16) / 116;
        let xComponent: number = this.aAxisValue / 500 + yComponent;
        let zComponent: number = this.bAxisValue / 200;
        xComponent = 0.95047 * ((xComponent * xComponent * xComponent > 0.008856) ? xComponent * xComponent * xComponent : (xComponent - 16/116) / 7.787);
        yComponent = 1.00000 * ((yComponent * yComponent * yComponent > 0.008856) ? yComponent * yComponent * yComponent : (yComponent - 16/116) / 7.787);
        zComponent = 1.08883 * ((zComponent * zComponent * zComponent > 0.008856) ? zComponent * zComponent * zComponent : (zComponent - 16/116) / 7.787);

        return [xComponent, yComponent, zComponent];
    }

    private CalculateRGBComponentsFromXYZComponents(xComponent: number, yComponent: number, zComponent: number): [number, number, number] {
        let redComponent: number = xComponent *  3.2406 + yComponent * -1.5372 + zComponent * -0.4986;
        let greenComponent: number = xComponent * -0.9689 + yComponent *  1.8758 + zComponent *  0.0415;
        let blueComponent: number = xComponent *  0.0557 + yComponent * -0.2040 + zComponent *  1.0570;
        redComponent = (redComponent > 0.0031308) ? (1.055 * Math.pow(redComponent, 1/2.4) - 0.055) : 12.92 * redComponent;
        greenComponent = (greenComponent > 0.0031308) ? (1.055 * Math.pow(greenComponent, 1/2.4) - 0.055) : 12.92 * greenComponent;
        blueComponent = (blueComponent > 0.0031308) ? (1.055 * Math.pow(blueComponent, 1/2.4) - 0.055) : 12.92 * blueComponent;

        return [redComponent, greenComponent, blueComponent];
    }

    public ToHex(): Hexadecimal {
        return this.ToRGB().ToHex();
    }

    public CalculateCie94Distance(color: Cielab): number {
        const deltaL: number = this.Lightness - color.Lightness;
        const C1: number = Math.sqrt(Math.pow(this.aAxisValue, 2) + Math.pow(color.aAxisValue, 2));
        const C2: number = Math.sqrt(Math.pow(this.bAxisValue, 2) + Math.pow(color.bAxisValue, 2));
        const deltaC: number = C1 - C2;
        const deltaA: number = this.aAxisValue - color.aAxisValue;
        const deltaB: number = this.bAxisValue - color.bAxisValue;
        const deltaH: number = Math.sqrt(Math.pow(deltaA, 2) + Math.pow(deltaB, 2) + Math.pow(deltaC, 2));
        
        const kSubL: number = 1;
        const kSubC: number = 1;
        const kSubH: number = 1;
        const K1 = 0.045;
        const K2 = 0.015;
        const sSubL: number = 1;
        const sSubC: number = 1 + K1*C1;
        const sSubH: number = 1 + K2*C1;
        
        const deltaEDeltaLQuotient: number = deltaL/(kSubL*sSubL);
        const deltaEDeltaCQuotient: number = deltaC/(kSubC*sSubC);
        const deltaEDeltaHQuotient: number = deltaH/(kSubH*sSubH);
        const deltaE: number = Math.sqrt(Math.pow(deltaEDeltaLQuotient, 2) + Math.pow(deltaEDeltaCQuotient, 2) + Math.pow(deltaEDeltaHQuotient, 2));
        return deltaE;
    }

}
