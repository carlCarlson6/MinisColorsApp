import { Container } from "inversify";
import { GetAllController } from "../../../paints/allEquivalentPaints/GetAllController";
import { GetController } from "../../../paints/allPaints/GetController";
import { GetByNearestColorController } from "../../../paints/nearestPaint/GetByNearestColorController";
import { GetByColorController } from "../../../paints/paintsByColor/GetByColorController";
import { InjectionTypes } from "../InjectionTypes";

export const injectControllers = (container: Container): Container  => {
    container.bind<GetAllController>(InjectionTypes.GetAllController).to(GetAllController);
    container.bind<GetByColorController>(InjectionTypes.GetByColorController).to(GetByColorController);
    container.bind<GetByNearestColorController>(InjectionTypes.GetByNearestColorController).to(GetByNearestColorController);
    container.bind<GetController>(InjectionTypes.GetController).to(GetController);

    return container;
};
