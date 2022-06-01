import { Container } from "inversify";
import { GetAllEquivalentPaints } from "../../../allEquivalentPaints/GetAllEquivalentPaints";
import { GetAllPaints } from "../../../allPaints/GetAllPaints";
import { GetNearestPaintsByColor } from "../../../nearestPaint/GetNearestPaintsByColor";
import { GetPaintsByColor } from "../../../paintsByColor/GetPaintsByColor";
import { InjectionTypes } from "../InjectionTypes";

export const injectApplications = (container: Container): Container => {
    container.bind<GetAllEquivalentPaints>(InjectionTypes.GetAllEquivalentPaints).to(GetAllEquivalentPaints);
    container.bind<GetAllPaints>(InjectionTypes.GetAllPaints).to(GetAllPaints);
    container.bind<GetNearestPaintsByColor>(InjectionTypes.GetNearestPaintsByColor).to(GetNearestPaintsByColor);
    container.bind<GetPaintsByColor>(InjectionTypes.GetPaintsByColor).to(GetPaintsByColor);

    return container;
}
