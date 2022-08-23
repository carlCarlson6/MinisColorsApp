import { Field, InputType, ObjectType } from "type-graphql";

// TODO add validation of the dto

@InputType("CielabInput")
@ObjectType("Cielab")
export class CielabDto {
    @Field() lightness: number;
    @Field() aValue: number;
    @Field() bValue: number;
}
