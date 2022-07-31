import { Container } from "inversify";
import { GetAllEquivalentPaints } from "../../../paints/allEquivalentPaints/GetAllEquivalentPaints";
import { GetAllPaints } from "../../../paints/allPaints/GetAllPaints";
import { GetNearestPaintsByColor } from "../../../paints/nearestPaint/GetNearestPaintsByColor";
import { GetPaintsByColor } from "../../../paints/paintsByColor/GetPaintsByColor";
import { InjectionTypes } from "../InjectionTypes";

export const injectApplications = (container: Container): Container => {
    container.bind<GetAllEquivalentPaints>(InjectionTypes.GetAllEquivalentPaints).to(GetAllEquivalentPaints);
    container.bind<GetAllPaints>(InjectionTypes.GetAllPaints).to(GetAllPaints);
    container.bind<GetNearestPaintsByColor>(InjectionTypes.GetNearestPaintsByColor).to(GetNearestPaintsByColor);
    container.bind<GetPaintsByColor>(InjectionTypes.GetPaintsByColor).to(GetPaintsByColor);

    return container;
}
