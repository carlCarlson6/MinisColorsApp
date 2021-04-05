import { Container } from "inversify";
import { AllEquivalentPaints } from "../../../app/getAllEquivalentPaints/AllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "../../../app/getAllEquivalentPaints/GetAllEquivalentPaintsQuery";
import { GetAllEquivalentPaintsQueryHandler } from "../../../app/getAllEquivalentPaints/GetAllEquivalentPaintsQueryHandler";
import { AllPaints } from "../../../app/getAllPaints/AllPaints";
import { GetAllPaintsQuery } from "../../../app/getAllPaints/GetAllPaintsQuery";
import { GetAllPaintsQueryHandler } from "../../../app/getAllPaints/GetAllPaintsQueryHandler";
import { GetNearestPaintsByColorQuery } from "../../../app/getNearestPaint/GetNearestPaintsByColorQuery";
import { GetNearestPaintsByColorQueryHandler } from "../../../app/getNearestPaint/GetNearestPaintsByColorQueryHandler";
import { NearestPaintsByColor } from "../../../app/getNearestPaint/NearestPaintsByColor";
import { GetPaintsByColorQuery } from "../../../app/getPaintsByColor/GetPaintsByColorQuery";
import { GetPaintsByColorQueryHandler } from "../../../app/getPaintsByColor/GetPaintsByColorQueryHandler";
import { PaintsByColor } from "../../../app/getPaintsByColor/PaintsByColor";
import { Handler } from "../../../core/services/Handler";
import { ServiceBus } from "../../../core/services/ServiceBus";
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
    
    const getAllEquivalentPaintsQueryHandler: Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints> = container.get<Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints>>(InjectionTypes.GetAllEquivalentPaintsQueryHandler);
    inMemoryServiceBus.Register(getAllEquivalentPaintsQueryHandler, InjectionTypes.GetAllEquivalentPaints);

    const getAllPaintsQueryHandler: Handler<GetAllPaintsQuery, AllPaints> = container.get<Handler<GetAllPaintsQuery, AllPaints>>(InjectionTypes.GetAllPaintsQueryHandler);
    inMemoryServiceBus.Register(getAllPaintsQueryHandler, InjectionTypes.GetAllPaintsQuery);

    const getNearestPaintQueryHandler: Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor> = container.get<Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor>>(InjectionTypes.GetNearestPaintsByColorQueryHandler);
    inMemoryServiceBus.Register(getNearestPaintQueryHandler, InjectionTypes.GetNearestPaintsByColorQuery);

    const getPaintsByColorQueryHandler: Handler<GetPaintsByColorQuery, PaintsByColor> = container.get<Handler<GetPaintsByColorQuery, PaintsByColor>>(InjectionTypes.GetPaintsByColorQueryHandler);
    inMemoryServiceBus.Register(getPaintsByColorQueryHandler, InjectionTypes.GetPaintsByColorQuery);

    container.bind<ServiceBus>(InjectionTypes.ServiceBus).toConstantValue(inMemoryServiceBus);

    return container;
}
