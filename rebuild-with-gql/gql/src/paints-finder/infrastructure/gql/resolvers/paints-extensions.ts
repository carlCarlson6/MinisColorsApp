import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { buildFromHexadecial } from "../../../core/colors/color-factory";
import { PaintDto } from "../dtos/paint-dto";
import { FindByNearestColor } from "../../../find-by-nearest-color";

@Service()
@Resolver(() => PaintDto)
export class PaintsExtensions {
    @Inject("paints-by-nearest")
    private readonly byNearesColor: FindByNearestColor;

    @FieldResolver(() => [PaintDto])
    async withSameColor(@Root() paintDto: PaintDto): Promise<PaintDto[]> {
        const color = buildFromHexadecial({hexCode: paintDto.color.hexadecimal});
        const paints = await this.byNearesColor(color);
        return paints.map(p => new PaintDto(p));
    }
}
