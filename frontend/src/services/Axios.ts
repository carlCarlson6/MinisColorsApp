import axios from "axios";

export const httpClient = axios.create({
    baseURL: process.env.REACT_APP_ASD as string, 
    headers: {'Access-Control-Allow-Origin': '*'} 
});
