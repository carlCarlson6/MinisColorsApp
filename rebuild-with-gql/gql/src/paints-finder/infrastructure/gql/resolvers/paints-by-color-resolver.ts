import { Arg, Query, Resolver, ResolverInterface } from "type-graphql";
import { Inject, Service } from "typedi";
import { CielabDto } from "../dtos/cielab-dto";
import { PaintDto } from "../dtos/paint-dto";
import { RgbDto } from "../dtos/rgb-dto";
import { FindByNearestColor } from "../../../find-by-nearest-color";
import { Paint } from "../../../core/paint";
import { colorFactory } from "../../../core/colors/color-factory";

@Service()
@Resolver()
export class PaintsByColorResolver {
    @Inject("paints-by-nearest")
    private readonly byNearesColor: FindByNearestColor;
    private readonly factory = colorFactory;

    @Query(() => [PaintDto])
    async findByHexadecimal(@Arg("input") input: string): Promise<PaintDto[]> {
        const color = this.factory.buildFromHexadecial({hexCode: input});
        const paints = await this.byNearesColor(color);
        return paints.map(p => new PaintDto(p));
    }

    @Query(() => [PaintDto])
    async findByCielab(@Arg("input") input: CielabDto): Promise<PaintDto[]> {
        const color = this.factory.buildFromCielab(input);
        const paints = await this.byNearesColor(color);
        return paints.map(p => new PaintDto(p));
    }

    @Query(() => [PaintDto])
    async findByRGB(@Arg("input") input: RgbDto): Promise<PaintDto[]> {
        const color = this.factory.buildFromRgb(input);
        const paints = await this.byNearesColor(color);
        return paints.map(p => new PaintDto(p));
    }
}

