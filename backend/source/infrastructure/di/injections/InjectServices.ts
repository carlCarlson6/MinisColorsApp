import { Container } from "inversify";
import { ColorsRepository } from "../../../core/services/repositories/ColorsRepository";
import { NearestColorFinder } from "../../../core/services/NearestColorFinder";
import { PaintsRepository } from "../../../core/services/repositories/PaintsRepository";
import { ColorsMongoRepository } from "../../mongoRepositories/ColorsMongoRepository";
import { PaintsMongoRepository } from "../../mongoRepositories/PaintsMongoRepository";
import { InjectionTypes } from "../InjectionTypes";

export const injectServices = (container: Container): Container => {
    container.bind<ColorsRepository>(InjectionTypes.ColorsRepository).to(ColorsMongoRepository);
    container.bind<PaintsRepository>(InjectionTypes.PaintsRepository).to(PaintsMongoRepository);

    container.bind<NearestColorFinder>(InjectionTypes.NearestColorFinder).to(NearestColorFinder);

    return container;
}
