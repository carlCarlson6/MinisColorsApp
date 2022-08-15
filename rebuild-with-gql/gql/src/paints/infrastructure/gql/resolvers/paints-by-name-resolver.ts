import { Arg, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { PaintDto } from "../dtos/paint-dto";
import { FindByName } from "../../../find-by-name";

@Service()
@Resolver()
export class PaintsByNameResolver {
	@Inject("paints-by-name")
	private readonly byName: FindByName;

	@Query(() => [PaintDto], {name: "findByName"})
	async execute(@Arg("name") name: string): Promise<PaintDto[]> {
		const paints = await this.byName(name);
		return paints.map(p => new PaintDto(p));
	}
}