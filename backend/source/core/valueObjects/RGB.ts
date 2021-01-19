import { Cielab } from "./Cielab";
import { Hexadecimal } from "./Hexadecimal";

export class RGB {
    public Red: number;
    public Green: number;
    public Blue: number;

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
        let redComponent: number = this.Red / 255;
        let greenComponent: number = this.Green / 255;
        let blueComponent: number = this.Blue / 255;
        redComponent = (redComponent > 0.04045) ? Math.pow((redComponent + 0.055) / 1.055, 2.4) : redComponent / 12.92;
        greenComponent = (greenComponent > 0.04045) ? Math.pow((greenComponent + 0.055) / 1.055, 2.4) : greenComponent / 12.92;
        blueComponent = (blueComponent > 0.04045) ? Math.pow((blueComponent + 0.055) / 1.055, 2.4) : blueComponent / 12.92;

        let xComponent: number = (redComponent * 0.4124 + greenComponent * 0.3576 + blueComponent * 0.1805) / 0.95047;
        let yComponent: number = (redComponent * 0.2126 + greenComponent * 0.7152 + blueComponent * 0.0722) / 1.00000;
        let zComponent: number = (redComponent * 0.0193 + greenComponent * 0.1192 + blueComponent * 0.9505) / 1.08883;
        xComponent = (xComponent > 0.008856) ? Math.pow(xComponent, 1/3) : (7.787 * xComponent) + 16/116;
        yComponent = (yComponent > 0.008856) ? Math.pow(yComponent, 1/3) : (7.787 * yComponent) + 16/116;
        zComponent = (zComponent > 0.008856) ? Math.pow(zComponent, 1/3) : (7.787 * zComponent) + 16/116;

        const labComponents: Array<number> = [(116 * yComponent) - 16, 500 * (xComponent - yComponent), 200 * (yComponent - zComponent)];
        return new Cielab(labComponents[0], labComponents[1], labComponents[2])
    }

}