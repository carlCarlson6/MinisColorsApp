import { Cielab } from "./cielab";
import { RGB } from "./rgb";

export class XYZComponents {
    constructor(
        readonly X: number,
        readonly Y: number,
        readonly Z: number,
    ) { }

    public static FromCielab(cielab: Cielab): XYZComponents {
        let yComponent = (cielab.Lightness + 16) / 116;
        let xComponent = cielab.AAxisValue / 500 + yComponent;
        let zComponent = cielab.BAxisValue / 200;
        xComponent = 0.95047 * ((xComponent * xComponent * xComponent > 0.008856) ? xComponent * xComponent * xComponent : (xComponent - 16/116) / 7.787);
        yComponent = 1.00000 * ((yComponent * yComponent * yComponent > 0.008856) ? yComponent * yComponent * yComponent : (yComponent - 16/116) / 7.787);
        zComponent = 1.08883 * ((zComponent * zComponent * zComponent > 0.008856) ? zComponent * zComponent * zComponent : (zComponent - 16/116) / 7.787);

        return new XYZComponents(xComponent, yComponent, zComponent);
    }

    public static FromRGB(RGB: RGB): XYZComponents {
        const [relativeRedComponent, relativeGreenComponent, relativeBlueComponent] = this.CalculateRelativeRGBComponents(RGB);

        let xComponent: number = (relativeRedComponent * 0.4124 + relativeGreenComponent * 0.3576 + relativeBlueComponent * 0.1805) / 0.95047;
        let yComponent: number = (relativeRedComponent * 0.2126 + relativeGreenComponent * 0.7152 + relativeBlueComponent * 0.0722) / 1.00000;
        let zComponent: number = (relativeRedComponent * 0.0193 + relativeGreenComponent * 0.1192 + relativeBlueComponent * 0.9505) / 1.08883;
        xComponent = (xComponent > 0.008856) ? Math.pow(xComponent, 1/3) : (7.787 * xComponent) + 16/116;
        yComponent = (yComponent > 0.008856) ? Math.pow(yComponent, 1/3) : (7.787 * yComponent) + 16/116;
        zComponent = (zComponent > 0.008856) ? Math.pow(zComponent, 1/3) : (7.787 * zComponent) + 16/116;

        return new XYZComponents(xComponent, yComponent, zComponent);
    }

    private static CalculateRelativeRGBComponents({ Red, Green, Blue }: RGB): [number, number, number] {
        let relativeRedComponent: number = Red / 255;
        let relativeGreenComponent: number = Green / 255;
        let relativeBlueComponent: number = Blue / 255;
        relativeRedComponent = (relativeRedComponent > 0.04045) ? Math.pow((relativeRedComponent + 0.055) / 1.055, 2.4) : relativeRedComponent / 12.92;
        relativeGreenComponent = (relativeGreenComponent > 0.04045) ? Math.pow((relativeGreenComponent + 0.055) / 1.055, 2.4) : relativeGreenComponent / 12.92;
        relativeBlueComponent = (relativeBlueComponent > 0.04045) ? Math.pow((relativeBlueComponent + 0.055) / 1.055, 2.4) : relativeBlueComponent / 12.92;
        return [relativeRedComponent, relativeGreenComponent, relativeBlueComponent];
    }
}