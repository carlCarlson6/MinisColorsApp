import { CompanyName } from "../valueObjects/CompanyName";
import { PaintName } from "../valueObjects/PaintName";
import { Color } from "./Color";

export class Paint {
    constructor(
        readonly Company: CompanyName, 
        readonly Name: PaintName, 
        readonly Color: Color
    ) { }
}