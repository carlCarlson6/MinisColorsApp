import { PaintState } from "../../models/PaintState";
import { PaintAction } from "./PaintAction";

export const paintReducer = (state: PaintState, action: PaintAction) => {
    switch(action.type) {
        default: return state;
    }
}