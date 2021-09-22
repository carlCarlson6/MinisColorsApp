import { Container } from "inversify";
import { GetAllController } from "../../api/paints/controllers/GetAllController";
import { GetByColorController } from "../../api/paints/controllers/GetByColorController";
import { GetByNearestColorController } from "../../api/paints/controllers/GetByNearestColorController";
import { GetController } from "../../api/paints/controllers/GetController";
import { InjectionTypes } from "../InjectionTypes";

export const injectControllers = (container: Container): Container  => {
    container.bind<GetAllController>(InjectionTypes.GetAllController).to(GetAllController);
    container.bind<GetByColorController>(InjectionTypes.GetByColorController).to(GetByColorController);
    container.bind<GetByNearestColorController>(InjectionTypes.GetByNearestColorController).to(GetByNearestColorController);
    container.bind<GetController>(InjectionTypes.GetController).to(GetController);

    return container;
};
