import { Server } from "./infrastructure/api/Server";
import dotenv from 'dotenv';
import { config as readEnvConfig } from "dotenv";

const bootstrap = async () => {
    dotenv.config({path:'../dev.env'});

    const server: Server = new Server();
    server.Start(); 
}

console.log('stating the server');
readEnvConfig();
bootstrap();
