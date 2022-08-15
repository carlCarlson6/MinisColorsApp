import { Field, ObjectType } from "type-graphql";

@ObjectType("Cielab")
export class CielabDto {
    @Field() lightness: number;
    @Field() a: number;
    @Field() b: number;
}
