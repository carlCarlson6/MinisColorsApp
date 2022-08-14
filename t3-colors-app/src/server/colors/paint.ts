import { Color } from "./color";

export class Paint {
    constructor(
        readonly Company: string,
        readonly Name: string,
        readonly color: Color,
    ) { }
}

export class PaintDto {
    constructor(
        readonly Company: string,
        readonly Name: string,
        readonly color: string,
    ) { }
}