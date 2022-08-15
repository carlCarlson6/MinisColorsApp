import { Field, ObjectType } from "type-graphql";
import { ColorDto } from "./color-dto";
import { Paint } from "../core/paint";


@ObjectType("Paint")
export class PaintDto {
    @Field() company: string;
    @Field() name: string;
    @Field(() => ColorDto) color: ColorDto;

    constructor(input: Paint) {
        this.company = input.company;
        this.name = input.name,
            this.color = ColorDto.fromDomain(input.color);
    }
}
