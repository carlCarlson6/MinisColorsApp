import { PaintState } from "../models/PaintState";
import { PaintsSearchService } from "../services/PaintsSearchService";

export interface PaintController {
    State: PaintState;
    PaintsSearchService: PaintsSearchService;
}