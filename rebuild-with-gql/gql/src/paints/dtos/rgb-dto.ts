import { Field, ObjectType } from "type-graphql";

@ObjectType("RGB")
export class RgbDto {
    @Field() red: number;
    @Field() green: number;
    @Field() blue: number;
}
