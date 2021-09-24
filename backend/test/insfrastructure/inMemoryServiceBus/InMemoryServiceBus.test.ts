import { Mock, Times, It } from "moq.ts";
import { AllEquivalentPaints } from "../../../source/app/getAllEquivalentPaints/AllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "../../../source/app/getAllEquivalentPaints/GetAllEquivalentPaintsQuery";
import { AllPaints } from "../../../source/app/getAllPaints/AllPaints";
import { GetAllPaintsQuery } from "../../../source/app/getAllPaints/GetAllPaintsQuery";
import { GetNearestPaintsByColorQuery } from "../../../source/app/getNearestPaint/GetNearestPaintsByColorQuery";
import { NearestPaintsByColor } from "../../../source/app/getNearestPaint/NearestPaintsByColor";
import { GetPaintsByColorQuery } from "../../../source/app/getPaintsByColor/GetPaintsByColorQuery";
import { PaintsByColor } from "../../../source/app/getPaintsByColor/PaintsByColor";
import { Handler } from "../../../source/core/services/Handler";
import { InjectionTypes } from "../../../source/infrastructure/di/InjectionTypes";
import { InMemoryServiceBus } from "../../../source/infrastructure/inMemoryServiceBus/InMemoryServiceBus";


describe("TODO - name it", () => {
    it("TODO - name it", async () => {
        var inMemoryServiceBus = new InMemoryServiceBus();
        
        const getAllEquivalentPaintsQueryHandlerMock = new Mock<Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints>>()
            .setup(m => m.Handle(It.IsAny<GetAllEquivalentPaintsQuery>()))
            .returns(It.IsAny<AllEquivalentPaints>());
        inMemoryServiceBus.Register(getAllEquivalentPaintsQueryHandlerMock.object(), InjectionTypes.GetAllEquivalentPaints);
        const getAllEquivalentPaintsQuery = new GetAllEquivalentPaintsQuery("some-paintName");
        
        const getAllPaintsQueryHandlerMock = new Mock<Handler<GetAllPaintsQuery, AllPaints>>()
            .setup(m => m.Handle(It.IsAny<GetAllPaintsQuery>()))
            .returns(It.IsAny<AllPaints>());
        inMemoryServiceBus.Register(getAllPaintsQueryHandlerMock.object(), InjectionTypes.GetAllPaintsQuery);
        const getAllPaintsQuery = new GetAllPaintsQuery();

        const getNearestPaintQueryHandlerMock = new Mock<Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor>>()
            .setup(m => m.Handle(It.IsAny<GetNearestPaintsByColorQuery>()))
            .returns(It.IsAny<NearestPaintsByColor>());
        inMemoryServiceBus.Register(getNearestPaintQueryHandlerMock.object(), InjectionTypes.GetNearestPaintsByColorQuery);
        const getNearestPaintsByColorQuery = new GetNearestPaintsByColorQuery("some-hexadecimalCode");

        const getPaintsByColorQueryHandlerMock = new Mock<Handler<GetPaintsByColorQuery, PaintsByColor>>()
            .setup(m => m.Handle(It.IsAny<GetPaintsByColorQuery>()))
            .returns(It.IsAny<PaintsByColor>());        
        inMemoryServiceBus.Register(getPaintsByColorQueryHandlerMock.object(), InjectionTypes.GetPaintsByColorQuery);
        const getPaintByColorQuery = new GetPaintsByColorQuery("some-hexadecimalCode");

        await inMemoryServiceBus.Dispatch<GetAllEquivalentPaintsQuery, AllEquivalentPaints>(getAllEquivalentPaintsQuery);
        await inMemoryServiceBus.Dispatch<GetAllPaintsQuery, AllPaints>(getAllPaintsQuery);
        await inMemoryServiceBus.Dispatch<GetNearestPaintsByColorQuery, NearestPaintsByColor>(getNearestPaintsByColorQuery);
        await inMemoryServiceBus.Dispatch<GetPaintsByColorQuery, PaintsByColor>(getPaintByColorQuery);
    });
});