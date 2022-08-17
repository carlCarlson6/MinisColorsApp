import { Field, InputType, ObjectType } from "type-graphql";

// TODO add validation of the dto

@InputType("CielabInput")
@ObjectType("Cielab")
export class CielabDto {
    @Field() lightness: number;
    @Field() a: number;
    @Field() b: number;
}
