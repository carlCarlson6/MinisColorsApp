import { Handler, ICommandHandler } from "tsmediator";
import { AllEquivalentPaints } from "../../app/getAllEquivalentPaints/AllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "../../app/getAllEquivalentPaints/GetAllEquivalentPaintsQuery";

@Handler(GetAllEquivalentPaintTsMediatorHandler.Type)
export class GetAllEquivalentPaintTsMediatorHandler implements ICommandHandler<GetAllEquivalentPaintsQuery, Promise<AllEquivalentPaints>> {
    Validate?: ((command: GetAllEquivalentPaintsQuery) => void) | undefined;
    Handle: (command: GetAllEquivalentPaintsQuery) => Promise<AllEquivalentPaints>;
    Log?: (() => void) | undefined;
    
    public static get Type(): string {
        return "GetAllEquivalentPaintTsMediatorHandler";
    }


    
}