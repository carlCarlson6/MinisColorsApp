import { Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { AllPaints } from "../../../all-paints";
import { PaintDto } from "../dtos/paint-dto";

@Service()
@Resolver()
export class AllPaintsResolver {
	@Inject("all-paints")
	private readonly useCase: AllPaints;

	@Query(() => [PaintDto], {name: "paints"})
	async execute(): Promise<PaintDto[]> {
		const paints = await this.useCase();
		return paints.map(p => new PaintDto(p));
	}
}