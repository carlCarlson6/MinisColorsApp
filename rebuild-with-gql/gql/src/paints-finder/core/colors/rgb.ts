import { Cielab } from "./cielab";
import { Hexadecimal } from "./hexadecimal";
import { XYZComponents } from "./xyz-components";

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

    public ToHex(): Hexadecimal {
        const hexValue: string = "" + this.ComponentToHex(this.Red) + this.ComponentToHex(this.Green) + this.ComponentToHex(this.Blue)
        return new Hexadecimal(hexValue);
    }

    public ToCielab(): Cielab {
        const xyzComponents = XYZComponents.FromRGB(this);
        const [lComponent, aComponent, bComponent] = this.CalculateLABComponentsFromXYZComponents(xyzComponents);
        return new Cielab(lComponent, aComponent, bComponent);
    }

    private ValidateRgbComponent(component: number): void {
        if(component < 0) {
            throw new Error("Invalid RGB component - it can't be below 0.");
        }
        if(255 < component) {
            throw new Error("Invalid RGB component - it can't be over 255.");
        }
    }

    private ComponentToHex(component: number) {
        const hexComponent = component.toString(16);
        return hexComponent.length == 1 ? "0" + hexComponent : hexComponent;
    }

    private CalculateLABComponentsFromXYZComponents({X, Y, Z}: XYZComponents): [number, number, number] {
        const lComponent = (116 * Y) - 16;
        const aComponent = 500 * (X - Y);
        const bComponent = 200 * (Y - Z);
        return [lComponent, aComponent, bComponent];
    }
}
