import { Field, InputType, ObjectType } from "type-graphql";

// TODO add validation of the dto

@InputType("RGBInput")
@ObjectType("RGB")
export class RgbDto {
    @Field() red: number;
    @Field() green: number;
    @Field() blue: number;
}
