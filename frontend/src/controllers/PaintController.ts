import { IPaintState } from "../models/PaintState";
import { PaintService } from "../services/PaintServcive";

export interface PaintController {
    State: IPaintState;
    PaintServices: PaintService;
}