import { Field, ObjectType } from "type-graphql";
import { Color } from "../core/colors/color";
import { CielabDto } from "./cielab-dto";
import { RgbDto } from "./rgb-dto";

@ObjectType("Color")
export class ColorDto {
    @Field() hexadecimal: string;
    @Field(() => RgbDto) rgb: RgbDto;
    @Field() cielab: CielabDto;

    static fromDomain(input: Color) {
        const color = new ColorDto();
        color.hexadecimal = input.hexadecimal.value;
        color.rgb = { red: input.rgb.Red, blue: input.rgb.Blue, green: input.rgb.Green };
        color.cielab = { lightness: input.cielab.Lightness, a: input.cielab.AAxisValue, b: input.cielab.BAxisValue };
        return color;
    }
}
