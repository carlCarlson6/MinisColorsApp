import { IPaintState } from "../../models/PaintState";
import { PaintAction } from "./PaintAction";

export const paintReducer = (state: IPaintState, action: PaintAction) => {
    switch(action.type) {
        default: return state;
    }
}