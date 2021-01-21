import { PaintState } from "../models/PaintState";
import { PaintService } from "../services/PaintServcive";

export interface PaintController {
    State: PaintState;
    PaintServices: PaintService;
}