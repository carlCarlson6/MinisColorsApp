import { Cielab } from "./Cielab";
import { Hexadecimal } from "./Hexadecimal";

export class RGB {
    public readonly Red: number;
    public readonly Green: number;
    public readonly Blue: number;

    constructor(red: number, green: number, blue: number) {
        [red, green, blue].forEach(component => this.ValidateRgbComponent(component));

        this.Red = red;
        this.Green = green;
        this.Blue = blue;
    }

    private ValidateRgbComponent(component: number): void {
        if(component < 0) {
            throw new Error("Invalid RGB component - it can't be below 0.");
        }
        if(255 < component) {
            throw new Error("Invalid RGB component - it can't be over 255.");
        }
    }

    public ToHex(): Hexadecimal {
        const hexValue: string = "" + this.ComponentToHex(this.Red) + this.ComponentToHex(this.Green) + this.ComponentToHex(this.Blue)
        return new Hexadecimal(hexValue);
    }

    private ComponentToHex(component: number) {
        const hexComponent = component.toString(16);
        return hexComponent.length == 1 ? "0" + hexComponent : hexComponent;
    }

    public ToCielab(): Cielab {
        const [relativeRedComponent, relativeGreenComponent, relativeBlueComponent] = this.CalculateRelativeRGBComponents();
        const [xComponent, yComponent, zComponent] = this.CalculateXYZComponentsFromRelativeRGBComponents(relativeRedComponent, relativeGreenComponent, relativeBlueComponent);
        const [lComponent, aComponent, bComponent] = this.CalculateLABComponentsFromXYZComponents(xComponent, yComponent, zComponent);
        return new Cielab(lComponent, aComponent, bComponent);
    }

    private CalculateRelativeRGBComponents(): [number, number, number] {
        let relativeRedComponent: number = this.Red / 255;
        let relativeGreenComponent: number = this.Green / 255;
        let relativeBlueComponent: number = this.Blue / 255;
        relativeRedComponent = (relativeRedComponent > 0.04045) ? Math.pow((relativeRedComponent + 0.055) / 1.055, 2.4) : relativeRedComponent / 12.92;
        relativeGreenComponent = (relativeGreenComponent > 0.04045) ? Math.pow((relativeGreenComponent + 0.055) / 1.055, 2.4) : relativeGreenComponent / 12.92;
        relativeBlueComponent = (relativeBlueComponent > 0.04045) ? Math.pow((relativeBlueComponent + 0.055) / 1.055, 2.4) : relativeBlueComponent / 12.92;
        return [relativeRedComponent, relativeGreenComponent, relativeBlueComponent];
    }

    private CalculateXYZComponentsFromRelativeRGBComponents(relativeRedComponent: number, relativeGreenComponent: number, relativeBlueComponent: number): [number, number, number] {
        let xComponent: number = (relativeRedComponent * 0.4124 + relativeGreenComponent * 0.3576 + relativeBlueComponent * 0.1805) / 0.95047;
        let yComponent: number = (relativeRedComponent * 0.2126 + relativeGreenComponent * 0.7152 + relativeBlueComponent * 0.0722) / 1.00000;
        let zComponent: number = (relativeRedComponent * 0.0193 + relativeGreenComponent * 0.1192 + relativeBlueComponent * 0.9505) / 1.08883;
        xComponent = (xComponent > 0.008856) ? Math.pow(xComponent, 1/3) : (7.787 * xComponent) + 16/116;
        yComponent = (yComponent > 0.008856) ? Math.pow(yComponent, 1/3) : (7.787 * yComponent) + 16/116;
        zComponent = (zComponent > 0.008856) ? Math.pow(zComponent, 1/3) : (7.787 * zComponent) + 16/116;
        return [xComponent, yComponent, zComponent];
    }

    private CalculateLABComponentsFromXYZComponents(xComponent: number, yComponent: number, zComponent: number): [number, number, number] {
        const lComponent = (116 * yComponent) - 16;
        const aComponent = 500 * (xComponent - yComponent);
        const bComponent = 200 * (yComponent - zComponent);
        return [lComponent, aComponent, bComponent];
    }

}
