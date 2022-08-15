import { Color } from "./colors/color";

export class Paint {
    constructor(
        readonly company: string,
        readonly name: string,
        readonly color: Color,
    ) { }
}

