import { Container } from "inversify";
import { GetAllEquivalentPaints } from "../../../app/getAllEquivalentPaints/GetAllEquivalentPaints";
import { GetAllPaints } from "../../../app/getAllPaints/GetAllPaints";
import { GetNearestPaintByColor } from "../../../app/GetNearestPaintByColor";
import { GetPaintsByColor } from "../../../app/GetPaintsByColor";
import { ColorsRepository } from "../../../core/services/ColorsRepository";
import { PaintsRepository } from "../../../core/services/PaintsRepository";
import { NearestColorFinder } from "../../../core/services/NearestColorFinder";
import { GetAllController } from "../paints/controllers/GetAllController";
import { GetByColorController } from "../paints/controllers/GetByColorController";
import { GetByNearestColorController } from "../paints/controllers/GetByNearestColorController";
import { GetController } from "../paints/controllers/GetController";
import { InjectionTypes } from "./InjectionTypes";
import { ColorsMongoRepository } from "../../mongoRepository/ColorsMongoRepository";
import { PaintsMongoRepository } from "../../mongoRepository/PaintsMongoRepository";

const container: Container = new Container();

container.bind<GetAllController>(InjectionTypes.GetAllController).to(GetAllController);
container.bind<GetByColorController>(InjectionTypes.GetByColorController).to(GetByColorController);
container.bind<GetByNearestColorController>(InjectionTypes.GetByNearestColorController).to(GetByNearestColorController);
container.bind<GetController>(InjectionTypes.GetController).to(GetController);

container.bind<GetAllEquivalentPaints>(InjectionTypes.GetAllEquivalentPaints).to(GetAllEquivalentPaints);
container.bind<GetAllPaints>(InjectionTypes.GetAllPaints).to(GetAllPaints);
container.bind<GetNearestPaintByColor>(InjectionTypes.GetNearestPaintByColor).to(GetNearestPaintByColor);
container.bind<GetPaintsByColor>(InjectionTypes.GetPaintsByColor).to(GetPaintsByColor);

container.bind<ColorsRepository>(InjectionTypes.IColorsRepository).to(ColorsMongoRepository);
container.bind<PaintsRepository>(InjectionTypes.IPaintsRepository).to(PaintsMongoRepository);

container.bind<NearestColorFinder>(InjectionTypes.NearestColorFinder).to(NearestColorFinder);

export default container;