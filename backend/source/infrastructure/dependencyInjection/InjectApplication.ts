import { Container } from "inversify";
import { AllEquivalentPaints } from "../../app/getAllEquivalentPaints/AllEquivalentPaints";
import { GetAllEquivalentPaints } from "../../app/getAllEquivalentPaints/GetAllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "../../app/getAllEquivalentPaints/GetAllEquivalentPaintsQuery";
import { GetAllEquivalentPaintsQueryHandler } from "../../app/getAllEquivalentPaints/GetAllEquivalentPaintsQueryHandler";
import { AllPaints } from "../../app/getAllPaints/AllPaints";
import { GetAllPaints } from "../../app/getAllPaints/GetAllPaints";
import { GetAllPaintsQuery } from "../../app/getAllPaints/GetAllPaintsQuery";
import { GetAllPaintsQueryHandler } from "../../app/getAllPaints/GetAllPaintsQueryHandler";
import { GetNearestPaintsByColor } from "../../app/getNearestPaint/GetNearestPaintsByColor";
import { GetNearestPaintsByColorQuery } from "../../app/getNearestPaint/GetNearestPaintsByColorQuery";
import { GetNearestPaintsByColorQueryHandler } from "../../app/getNearestPaint/GetNearestPaintsByColorQueryHandler";
import { NearestPaintsByColor } from "../../app/getNearestPaint/NearestPaintsByColor";
import { GetPaintsByColor } from "../../app/getPaintsByColor/GetPaintsByColor";
import { GetPaintsByColorQuery } from "../../app/getPaintsByColor/GetPaintsByColorQuery";
import { GetPaintsByColorQueryHandler } from "../../app/getPaintsByColor/GetPaintsByColorQueryHandler";
import { PaintsByColor } from "../../app/getPaintsByColor/PaintsByColor";
import { Handler } from "../../core/services/Handler";
import { InjectionTypes } from "./InjectionTypes";

export const injectApplications = (container: Container) => {
    container.bind<GetAllEquivalentPaints>(InjectionTypes.GetAllEquivalentPaints).to(GetAllEquivalentPaints);
    container.bind<Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints>>(InjectionTypes.GetAllEquivalentPaintsQueryHandler).to(GetAllEquivalentPaintsQueryHandler);
    
    container.bind<GetAllPaints>(InjectionTypes.GetAllPaints).to(GetAllPaints);
    container.bind<Handler<GetAllPaintsQuery, AllPaints>>(InjectionTypes.GetAllPaintsQueryHandler).to(GetAllPaintsQueryHandler);

    container.bind<GetNearestPaintsByColor>(InjectionTypes.GetNearestPaintsByColor).to(GetNearestPaintsByColor);
    container.bind<Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor>>(InjectionTypes.GetNearestPaintsByColorQueryHandler).to(GetNearestPaintsByColorQueryHandler);

    container.bind<GetPaintsByColor>(InjectionTypes.GetPaintsByColor).to(GetPaintsByColor);
    container.bind<Handler<GetPaintsByColorQuery, PaintsByColor>>(InjectionTypes.GetPaintsByColorQueryHandler).to(GetPaintsByColorQueryHandler);
}