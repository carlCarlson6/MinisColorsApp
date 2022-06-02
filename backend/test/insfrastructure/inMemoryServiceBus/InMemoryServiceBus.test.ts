import { Mock, Times, It } from "moq.ts";
import { InMemoryServiceBus } from "../../../source/bus/infrastructure/InMemoryServiceBus";
import { AllEquivalentPaints } from "../../../source/paints/allEquivalentPaints/AllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "../../../source/paints/allEquivalentPaints/GetAllEquivalentPaintsQuery";
import { AllPaints } from "../../../source/paints/allPaints/AllPaints";
import { GetAllPaintsQuery } from "../../../source/paints/allPaints/GetAllPaintsQuery";
import { GetNearestPaintsByColorQuery } from "../../../source/paints/nearestPaint/GetNearestPaintsByColorQuery";
import { NearestPaintsByColor } from "../../../source/paints/nearestPaint/NearestPaintsByColor";
import { GetPaintsByColorQuery } from "../../../source/paints/paintsByColor/GetPaintsByColorQuery";
import { PaintsByColor } from "../../../source/paints/paintsByColor/PaintsByColor";
import { Handler } from "../../../source/bus/Handler";


describe(InMemoryServiceBus.name, () => {
    it("when dispatches a known message finds and execute the handler", async () => {
        var inMemoryServiceBus = new InMemoryServiceBus();
        
        const getAllEquivalentPaintsQueryHandlerMock = new Mock<Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints>>()
            .setup(m => m.Handle(It.IsAny<GetAllEquivalentPaintsQuery>()))
            .returns(It.IsAny<AllEquivalentPaints>());
        inMemoryServiceBus.Register(getAllEquivalentPaintsQueryHandlerMock.object(), GetAllEquivalentPaintsQuery.name);
        const getAllEquivalentPaintsQuery = new GetAllEquivalentPaintsQuery("some-paintName");
        
        const getAllPaintsQueryHandlerMock = new Mock<Handler<GetAllPaintsQuery, AllPaints>>()
            .setup(m => m.Handle(It.IsAny<GetAllPaintsQuery>()))
            .returns(It.IsAny<AllPaints>());
        inMemoryServiceBus.Register(getAllPaintsQueryHandlerMock.object(), GetAllPaintsQuery.name);
        const getAllPaintsQuery = new GetAllPaintsQuery();

        const getNearestPaintQueryHandlerMock = new Mock<Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor>>()
            .setup(m => m.Handle(It.IsAny<GetNearestPaintsByColorQuery>()))
            .returns(It.IsAny<NearestPaintsByColor>());
        inMemoryServiceBus.Register(getNearestPaintQueryHandlerMock.object(), GetNearestPaintsByColorQuery.name);
        const getNearestPaintsByColorQuery = new GetNearestPaintsByColorQuery("some-hexadecimalCode");

        const getPaintsByColorQueryHandlerMock = new Mock<Handler<GetPaintsByColorQuery, PaintsByColor>>()
            .setup(m => m.Handle(It.IsAny<GetPaintsByColorQuery>()))
            .returns(It.IsAny<PaintsByColor>());        
        inMemoryServiceBus.Register(getPaintsByColorQueryHandlerMock.object(), GetPaintsByColorQuery.name);
        const getPaintByColorQuery = new GetPaintsByColorQuery("some-hexadecimalCode");

        await inMemoryServiceBus.Dispatch<GetAllEquivalentPaintsQuery, AllEquivalentPaints>(getAllEquivalentPaintsQuery);
        await inMemoryServiceBus.Dispatch<GetAllEquivalentPaintsQuery, AllEquivalentPaints>(getAllEquivalentPaintsQuery);
        await inMemoryServiceBus.Dispatch<GetAllPaintsQuery, AllPaints>(getAllPaintsQuery);
        await inMemoryServiceBus.Dispatch<GetNearestPaintsByColorQuery, NearestPaintsByColor>(getNearestPaintsByColorQuery);
        await inMemoryServiceBus.Dispatch<GetPaintsByColorQuery, PaintsByColor>(getPaintByColorQuery);

        getAllEquivalentPaintsQueryHandlerMock.verify(m => m.Handle(getAllEquivalentPaintsQuery), Times.Exactly(2));
        getAllPaintsQueryHandlerMock.verify(m => m.Handle(getAllPaintsQuery), Times.Once());
        getNearestPaintQueryHandlerMock.verify(m => m.Handle(getNearestPaintsByColorQuery), Times.Once());
        getPaintsByColorQueryHandlerMock.verify(m => m.Handle(getPaintByColorQuery), Times.Once());
    });
});