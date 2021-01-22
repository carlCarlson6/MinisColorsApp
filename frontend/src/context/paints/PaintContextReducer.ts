import { Action } from "../../models/Action";
import { PaintState } from "../../models/PaintState";
import { paintTypes } from "./PaintTypes";

export const paintReducer = (state: PaintState, action: Action): PaintState => {
    switch(action.type) {

        case paintTypes.StartRequestPaintByName:
            return { ...state, fetchingData: true };

        case paintTypes.OkRequestPaintByName:
            return { ...state, fetchingData: false, lastRequestOk: true, paints: action.payload };

        case paintTypes.KoRequestPaintByName:
            return { ...state, fetchingData: false, lastRequestOk: false }

        default: return state;
    }
}