import { PaintState } from "../context/paints/PaintContextState";
import { PaintsSearchService } from "../services/PaintsSearchService";

export interface PaintController {
    State: PaintState;
    PaintsSearchService: PaintsSearchService;
}