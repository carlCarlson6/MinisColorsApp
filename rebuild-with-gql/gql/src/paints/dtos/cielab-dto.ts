import { Field, InputType, ObjectType } from "type-graphql";

@InputType("CielabInput")
@ObjectType("Cielab")
export class CielabDto {
    @Field() lightness: number;
    @Field() a: number;
    @Field() b: number;
}
