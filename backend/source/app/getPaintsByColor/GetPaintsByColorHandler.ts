import { GetPaintsByColor } from "./GetPaintsByColor";
import { GetPaintsByColorQuery } from "./GetPaintsByColorQuery";

export class GetPaintsByColorHandler {
    private readonly useCase: GetPaintsByColor;

    constructor(getPaintsByColor: GetPaintsByColor) {
        this.useCase = getPaintsByColor;
    }

    public Handle(query: GetPaintsByColorQuery): void {

    }

}