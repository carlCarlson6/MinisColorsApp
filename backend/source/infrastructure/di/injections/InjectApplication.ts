import { Container } from "inversify";
import { GetAllEquivalentPaints } from "../../../app/getAllEquivalentPaints/GetAllEquivalentPaints";
import { GetAllPaints } from "../../../app/getAllPaints/GetAllPaints";
import { GetNearestPaintsByColor } from "../../../app/getNearestPaint/GetNearestPaintsByColor";
import { GetPaintsByColor } from "../../../app/getPaintsByColor/GetPaintsByColor";
import { InjectionTypes } from "../InjectionTypes";

export const injectApplications = (container: Container): Container => {
    container.bind<GetAllEquivalentPaints>(InjectionTypes.GetAllEquivalentPaints).to(GetAllEquivalentPaints);
    container.bind<GetAllPaints>(InjectionTypes.GetAllPaints).to(GetAllPaints);
    container.bind<GetNearestPaintsByColor>(InjectionTypes.GetNearestPaintsByColor).to(GetNearestPaintsByColor);
    container.bind<GetPaintsByColor>(InjectionTypes.GetPaintsByColor).to(GetPaintsByColor);

    return container;
}