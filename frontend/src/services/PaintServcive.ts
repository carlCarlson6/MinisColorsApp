import { Dispatch } from "react";
import { PaintAction } from "../context/paints/PaintAction";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Paint } from "../models/Paint";

export class PaintService {
    private dispatcher: Dispatch<PaintAction>;
    private httpClient: AxiosInstance;
    
    constructor(dispatch: Dispatch<PaintAction>, backendUrl: string) {
        this.dispatcher = dispatch;
        this.httpClient = axios.create({baseURL: backendUrl, headers: {'Access-Control-Allow-Origin': '*'}})
    }

    public async SearchByName(paintName: string): Promise<void> {
        console.log('click on search', paintName);
        
        let paints: Array<Paint>
        try {
            const response: AxiosResponse<Array<Paint>> = await this.httpClient.get<Array<Paint>>('/paints/'+paintName);
            
            if(!response) {
                console.log(response);
                return;
            }

            paints = response.data;
            console.log(paints)
        }
        catch(error) {
            console.log(error.message);
        }
    }

}