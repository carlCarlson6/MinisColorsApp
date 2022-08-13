import { Color } from "./color";

export class Paint {
    constructor(
        readonly Company: string,
        readonly Name: string,
        readonly color: Color,
    ) { }
}