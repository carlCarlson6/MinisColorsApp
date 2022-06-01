import { Hexadecimal } from "./Hexadecimal";
import { RGB } from "./RGB";
import { XYZComponents } from "./XYZComponents";

export class Cielab {
    public constructor(
        readonly Lightness: number, 
        readonly AAxisValue: number, 
        readonly BAxisValue: number
    ) { }

    public ToRGB(): RGB {
        const xyzComponents = XYZComponents.FromCielab(this);
        const [redComponent, greenComponent, blueComponent] = this.CalculateRGBComponentsFromXYZComponents(xyzComponents);

        return new RGB(redComponent, greenComponent, blueComponent)
    }

    public ToHex(): Hexadecimal {
        return this.ToRGB().ToHex();
    }

    private CalculateRGBComponentsFromXYZComponents({X, Y, Z}: XYZComponents): [number, number, number] {
        let redComponent = X *  3.2406 + Y * -1.5372 + Z * -0.4986;
        let greenComponent = X * -0.9689 + Y *  1.8758 + Y *  0.0415;
        let blueComponent = X *  0.0557 + Y * -0.2040 + Z *  1.0570;
        redComponent = (redComponent > 0.0031308) ? (1.055 * Math.pow(redComponent, 1/2.4) - 0.055) : 12.92 * redComponent;
        greenComponent = (greenComponent > 0.0031308) ? (1.055 * Math.pow(greenComponent, 1/2.4) - 0.055) : 12.92 * greenComponent;
        blueComponent = (blueComponent > 0.0031308) ? (1.055 * Math.pow(blueComponent, 1/2.4) - 0.055) : 12.92 * blueComponent;

        return [redComponent, greenComponent, blueComponent];
    }

    public CalculateCie94Distance(color: Cielab): number {
        const deltaL = this.Lightness - color.Lightness;
        const C1 = Math.sqrt(Math.pow(this.AAxisValue, 2) + Math.pow(color.AAxisValue, 2));
        const C2 = Math.sqrt(Math.pow(this.BAxisValue, 2) + Math.pow(color.BAxisValue, 2));
        const deltaC = C1 - C2;
        const deltaA = this.AAxisValue - color.AAxisValue;
        const deltaB = this.BAxisValue - color.BAxisValue;
        const deltaH = Math.sqrt(Math.pow(deltaA, 2) + Math.pow(deltaB, 2) + Math.pow(deltaC, 2));
        
        const kSubL = 1;
        const kSubC = 1;
        const kSubH = 1;
        const K1 = 0.045;
        const K2 = 0.015;
        const sSubL = 1;
        const sSubC = 1 + K1*C1;
        const sSubH = 1 + K2*C1;
        
        const deltaEDeltaLQuotient = deltaL/(kSubL*sSubL);
        const deltaEDeltaCQuotient = deltaC/(kSubC*sSubC);
        const deltaEDeltaHQuotient = deltaH/(kSubH*sSubH);
        const deltaE = Math.sqrt(Math.pow(deltaEDeltaLQuotient, 2) + Math.pow(deltaEDeltaCQuotient, 2) + Math.pow(deltaEDeltaHQuotient, 2));
        return deltaE;
    }
}