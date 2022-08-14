import { Field, ObjectType } from "type-graphql";
import { Color } from "./colors/color";

export class Paint {
    constructor(
        readonly company: string,
        readonly name: string,
        readonly color: Color,
    ) { }
}

@ObjectType()
export class PaintDto {
    @Field() company: string
    @Field() name: string
    @Field() color: string
    
    constructor(input: Paint) { 
        this.company = input.company;
        this.name = input.name,
        this.color = input.color.HexadecimalCode.ToString();
    }
}