import { Field, InputType, InterfaceType, ObjectType } from "type-graphql";

@InputType("RGBInput")
@ObjectType("RGB")
export class RgbDto {
    @Field() red: number;
    @Field() green: number;
    @Field() blue: number;
}
