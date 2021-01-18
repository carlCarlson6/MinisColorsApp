import { Container } from "inversify";
import { GetAllEquivalentPaints } from "../../app/GetAllEquivalentPaints";
import { GetAllPaints } from "../../app/GetAllPaints";
import { GetNearestPaintByColor } from "../../app/GetNearestPaintByColor";
import { GetPaintsByColor } from "../../app/GetPaintsByColor";
import { IColorsRepository } from "../../core/services/IColorsRepository";
import { IPaintsRepository } from "../../core/services/IPaintsRepository";
import { NearestColorFinder } from "../../core/services/NearestColorFinder";
import { ColorsMongoRepository } from "../../infrastructure/ColorsMongoRepository";
import { PaintsMongoRepository } from "../../infrastructure/PaintsMongoRepository";
import { GetAllController } from "../paints/controllers/GetAllController";
import { GetByColorController } from "../paints/controllers/GetByColorController";
import { GetByNearestColorController } from "../paints/controllers/GetByNearestColor";
import { GetController } from "../paints/controllers/GetController";
import { InjectionTypes } from "./InjectionTypes";

const container: Container = new Container();

container.bind<GetAllController>(InjectionTypes.GetAllController).to(GetAllController);
container.bind<GetByColorController>(InjectionTypes.GetByColorController).to(GetByColorController);
container.bind<GetByNearestColorController>(InjectionTypes.GetByNearestColorController).to(GetByNearestColorController);
container.bind<GetController>(InjectionTypes.GetController).to(GetController);

container.bind<GetAllEquivalentPaints>(InjectionTypes.GetAllEquivalentPaints).to(GetAllEquivalentPaints);
container.bind<GetAllPaints>(InjectionTypes.GetAllPaints).to(GetAllPaints);
container.bind<GetNearestPaintByColor>(InjectionTypes.GetNearestPaintByColor).to(GetNearestPaintByColor);
container.bind<GetPaintsByColor>(InjectionTypes.GetPaintsByColor).to(GetPaintsByColor);

container.bind<IColorsRepository>(InjectionTypes.IColorsRepository).to(ColorsMongoRepository);
container.bind<IPaintsRepository>(InjectionTypes.IPaintsRepository).to(PaintsMongoRepository);

container.bind<NearestColorFinder>(InjectionTypes.NearestColorFinder).to(NearestColorFinder);

export default container;