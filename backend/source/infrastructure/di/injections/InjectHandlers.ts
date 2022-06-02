import { Container } from "inversify";
import { GetPaintsByColorQuery } from "../../../paints/paintsByColor/GetPaintsByColorQuery";
import { GetPaintsByColorQueryHandler } from "../../../paints/paintsByColor/GetPaintsByColorQueryHandler";
import { PaintsByColor } from "../../../paints/paintsByColor/PaintsByColor";
import { InMemoryServiceBus } from "../../../bus/infrastructure/InMemoryServiceBus";
import { InjectionTypes } from "../InjectionTypes";
import { Handler } from "../../../bus/Handler";
import { ServiceBus } from "../../../bus/ServiceBus";
import { AllEquivalentPaints } from "../../../paints/allEquivalentPaints/AllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "../../../paints/allEquivalentPaints/GetAllEquivalentPaintsQuery";
import { GetAllEquivalentPaintsQueryHandler } from "../../../paints/allEquivalentPaints/GetAllEquivalentPaintsQueryHandler";
import { AllPaints } from "../../../paints/allPaints/AllPaints";
import { GetAllPaintsQuery } from "../../../paints/allPaints/GetAllPaintsQuery";
import { GetAllPaintsQueryHandler } from "../../../paints/allPaints/GetAllPaintsQueryHandler";
import { GetNearestPaintsByColorQuery } from "../../../paints/nearestPaint/GetNearestPaintsByColorQuery";
import { GetNearestPaintsByColorQueryHandler } from "../../../paints/nearestPaint/GetNearestPaintsByColorQueryHandler";
import { NearestPaintsByColor } from "../../../paints/nearestPaint/NearestPaintsByColor";

export const injectHandlers = (container: Container): Container => {
    container.bind<Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints>>(InjectionTypes.GetAllEquivalentPaintsQueryHandler).to(GetAllEquivalentPaintsQueryHandler);
    container.bind<Handler<GetAllPaintsQuery, AllPaints>>(InjectionTypes.GetAllPaintsQueryHandler).to(GetAllPaintsQueryHandler);
    container.bind<Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor>>(InjectionTypes.GetNearestPaintsByColorQueryHandler).to(GetNearestPaintsByColorQueryHandler);
    container.bind<Handler<GetPaintsByColorQuery, PaintsByColor>>(InjectionTypes.GetPaintsByColorQueryHandler).to(GetPaintsByColorQueryHandler);

    container = registerHandlers(container);

    return container;
}

const registerHandlers = (container: Container): Container => {
    const inMemoryServiceBus = new InMemoryServiceBus();
    
    const getAllEquivalentPaintsQueryHandler = container.get<Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints>>(InjectionTypes.GetAllEquivalentPaintsQueryHandler);
    inMemoryServiceBus.Register(getAllEquivalentPaintsQueryHandler, InjectionTypes.GetAllEquivalentPaints);

    const getAllPaintsQueryHandler = container.get<Handler<GetAllPaintsQuery, AllPaints>>(InjectionTypes.GetAllPaintsQueryHandler);
    inMemoryServiceBus.Register(getAllPaintsQueryHandler, InjectionTypes.GetAllPaints);

    const getNearestPaintQueryHandler = container.get<Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor>>(InjectionTypes.GetNearestPaintsByColorQueryHandler);
    inMemoryServiceBus.Register(getNearestPaintQueryHandler, InjectionTypes.GetNearestPaintsByColor);

    const getPaintsByColorQueryHandler = container.get<Handler<GetPaintsByColorQuery, PaintsByColor>>(InjectionTypes.GetPaintsByColorQueryHandler);
    inMemoryServiceBus.Register(getPaintsByColorQueryHandler, InjectionTypes.GetPaintsByColor);

    container.bind<ServiceBus>(InjectionTypes.ServiceBus).toConstantValue(inMemoryServiceBus);

    return container;
}