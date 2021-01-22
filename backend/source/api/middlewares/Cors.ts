import cors, { CorsOptions } from "cors";

//const options: cors.CorsOptions = {
//    allowedHeaders: [
//      'Origin',
//      'X-Requested-With',
//      'Content-Type',
//      'Accept',
//      'X-Access-Token',
//    ],
//    credentials: true,
//    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
//    origin: 'http://localhost:3000/',
//    preflightContinue: false,
//};

const localFrontend: string = process.env.LOCALFRONTEND as string; 

const options: CorsOptions = {
    credentials: true,
    origin: [
        localFrontend
    ]
}

export const corsMiddlware = cors();
