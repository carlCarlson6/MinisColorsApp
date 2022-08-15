import { FieldResolver, Resolver, ResolverInterface, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { ColorFactory } from "../../../core/colors/color-factory";
import { PaintDto } from "../dtos/paint-dto";
import { FindByNearestColor } from "../../../find-by-nearest-color";

@Service()
@Resolver(of => PaintDto)
export class PaintsExtensions {
    @Inject("paints-by-nearest")
    private readonly byNearesColor: FindByNearestColor;
    private readonly factory = new ColorFactory();

    @FieldResolver(() => [PaintDto])
    async withSameColor(@Root() paintDto: PaintDto): Promise<PaintDto[]> {
        const color = this.factory.BuildFromHexadecial(paintDto.color.hexadecimal);
        const paints = await this.byNearesColor(color);
        return paints.map(p => new PaintDto(p));
    }
}
