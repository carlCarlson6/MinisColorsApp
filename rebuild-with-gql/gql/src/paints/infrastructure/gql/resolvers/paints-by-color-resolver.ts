import { Arg, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { ColorFactory } from "../../../core/colors/color-factory";
import { CielabDto } from "../../../dtos/cielab-dto";
import { PaintDto } from "../../../dtos/paint-dto";
import { RgbDto } from "../../../dtos/rgb-dto";
import { FindByNearestColor } from "../../../find-by-nearest-color";

@Service()
@Resolver()
export class PaintsByColorResolver {
    @Inject("paints-by-nearest")
    private readonly byNearesColor: FindByNearestColor;
    private readonly factory = new ColorFactory();

    @Query(() => [PaintDto])
    async findByHexadecimal(@Arg("input") input: string): Promise<PaintDto[]> {
        const color = this.factory.BuildFromHexadecial(input);
        const paints = await this.byNearesColor(color);
        return paints.map(p => new PaintDto(p));
    }

    @Query(() => [PaintDto])
    async findByCielab(@Arg("input") input: CielabDto): Promise<PaintDto[]> {
        const color = this.factory.BuildFromCielab(input.lightness, input.a, input.b);
        const paints = await this.byNearesColor(color);
        return paints.map(p => new PaintDto(p));
    }

    @Query(() => [PaintDto])
    async findByRGB(@Arg("input") input: RgbDto): Promise<PaintDto[]> {
        const color = this.factory.BuildFromRGB(input.red, input.green, input.blue);
        const paints = await this.byNearesColor(color);
        return paints.map(p => new PaintDto(p));
    }
}