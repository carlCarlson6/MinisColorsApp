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
        color.hexadecimal = input.HexadecimalCode.value;
        color.rgb = { red: input.RGBCode.Red, blue: input.RGBCode.Blue, green: input.RGBCode.Green };
        color.cielab = { lightness: input.CielabCode.Lightness, a: input.CielabCode.AAxisValue, b: input.CielabCode.BAxisValue };
        return color;
    }
}
