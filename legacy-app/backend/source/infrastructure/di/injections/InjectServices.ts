import { Container } from "inversify";
import { ColorsRepository } from "../../../paints/services/ColorsRepository";
import { ColorsMongoRepository } from "../../../paints/services/infrastructure/mongoRepositories/ColorsMongoRepository";
import { PaintsMongoRepository } from "../../../paints/services/infrastructure/mongoRepositories/PaintsMongoRepository";
import { NearestColorFinder } from "../../../paints/services/NearestColorFinder";
import { PaintsRepository } from "../../../paints/services/PaintsRepository";
import { InjectionTypes } from "../InjectionTypes";

export const injectServices = (container: Container): Container => {
    container.bind<ColorsRepository>(InjectionTypes.ColorsRepository).to(ColorsMongoRepository);
    container.bind<PaintsRepository>(InjectionTypes.PaintsRepository).to(PaintsMongoRepository);

    container.bind<NearestColorFinder>(InjectionTypes.NearestColorFinder).to(NearestColorFinder);

    return container;
}
