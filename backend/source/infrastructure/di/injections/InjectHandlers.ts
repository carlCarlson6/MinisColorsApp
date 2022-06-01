import { Container } from "inversify";
import { AllEquivalentPaints } from "../../../allEquivalentPaints/AllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "../../../allEquivalentPaints/GetAllEquivalentPaintsQuery";
import { GetAllEquivalentPaintsQueryHandler } from "../../../allEquivalentPaints/GetAllEquivalentPaintsQueryHandler";
import { AllPaints } from "../../../allPaints/AllPaints";
import { GetAllPaintsQuery } from "../../../allPaints/GetAllPaintsQuery";
import { GetAllPaintsQueryHandler } from "../../../allPaints/GetAllPaintsQueryHandler";
import { Handler } from "../../../core/services/bus/Handler";
import { ServiceBus } from "../../../core/services/bus/ServiceBus";
import { GetNearestPaintsByColorQuery } from "../../../nearestPaint/GetNearestPaintsByColorQuery";
import { GetNearestPaintsByColorQueryHandler } from "../../../nearestPaint/GetNearestPaintsByColorQueryHandler";
import { NearestPaintsByColor } from "../../../nearestPaint/NearestPaintsByColor";
import { GetPaintsByColorQuery } from "../../../paintsByColor/GetPaintsByColorQuery";
import { GetPaintsByColorQueryHandler } from "../../../paintsByColor/GetPaintsByColorQueryHandler";
import { PaintsByColor } from "../../../paintsByColor/PaintsByColor";
import { InMemoryServiceBus } from "../../inMemoryServiceBus/InMemoryServiceBus";
import { InjectionTypes } from "../InjectionTypes";

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