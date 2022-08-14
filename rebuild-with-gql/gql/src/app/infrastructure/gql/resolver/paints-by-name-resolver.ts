import { Collection } from "mongodb";
import { Arg, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { PaintDto } from "../../../paint";
import { mapToDomain } from "../../mongo/finders/map-to-domain";
import { PaintsMongoModel } from "../../mongo/paints-mongo-model";

@Service()
@Resolver()
export class PaintsByNameResolver {
	@Inject("paints-collection")
	private readonly collection: Collection<PaintsMongoModel>

	@Query(returns => [PaintDto], {name: "byName"})
	async execute(@Arg("name") _: string): Promise<PaintDto[]> {
		const paintModels = await this.collection.find({}).toArray();
		return mapToDomain(paintModels).map(p => new PaintDto(p));
	}
}