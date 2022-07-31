import { Dispatch } from "react";
import { Action } from "../../Action";
import { PaintTypes } from "../PaintTypes";
import { Paint } from "../../../models/Paint";
import { httpClient } from "./Axios";

export default (dispatcher: Dispatch<Action<Paint[]>>) => async () => {
    dispatcher({ payload: [], type: PaintTypes.StartRequestPaints });
    
    try {
        const response = await httpClient.get<Array<Paint>>('/paints/');
        if(!response) {
            dispatcher({ payload: [], type: PaintTypes.KoRequestPaints })
            console.error("someting went wrong with the request");
        }

        dispatcher({ payload: response.data, type: PaintTypes.OkRequestPaints });
    }
    catch(error) {
        console.error(error);
        dispatcher({ payload: [], type: PaintTypes.KoRequestPaints })
    }
}