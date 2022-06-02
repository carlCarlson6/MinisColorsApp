import { Dispatch } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Paint } from "../models/Paint";
import { Action } from "../context/Action";
import { PaintTypes } from "../context/paints/PaintTypes";

export class PaintsSearchService {
    private httpClient = axios.create({baseURL: process.env.REACT_APP_ASD as string});
    private axiosRequestConfig: AxiosRequestConfig = { headers: {'Access-Control-Allow-Origin': '*'}};
    
    constructor(
        private readonly dispatcher: Dispatch<Action<Paint[]>>
    ) { }

    public async ByName(paintName: string): Promise<void> {
        this.dispatcher({ payload: [], type: PaintTypes.StartRequestPaintByName })
        try {
            const response: AxiosResponse<Array<Paint>> = await this.httpClient.get<Array<Paint>>('/paints/'+paintName, this.axiosRequestConfig);
            if(!response) {
                throw new Error("someting went wrong with the request");
            }

            const paints: Array<Paint> = response.data;
            this.dispatcher({ payload: paints, type: PaintTypes.OkRequestPaintByName });
        }
        catch(error) {
            this.dispatcher({ payload: [], type: PaintTypes.KoRequestPaintByName })
        }
    }

    public async ByColor(paintColor: string): Promise<void> {
        this.dispatcher({ payload: [], type: PaintTypes.StartRequestPaintByColor })
        try {
            const response: AxiosResponse<Array<Paint>> = await this.httpClient.get<Array<Paint>>('/paints/color/'+paintColor, this.axiosRequestConfig);
            if(!response) {
                throw new Error("someting went wrong with the request");
            }

            const paints: Array<Paint> = response.data;
            this.dispatcher({ payload: paints, type: PaintTypes.OkRequestPaintByColor });
        }
        catch(error) {
            this.dispatcher({ payload: [], type: PaintTypes.KoRequestPaintByColor })
        }
    }
}