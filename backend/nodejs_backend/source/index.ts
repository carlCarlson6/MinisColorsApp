import { Server } from "./api/Server";
import dotenv from 'dotenv';

const bootstrap = async () => {
    dotenv.config({path:'dev.env'});
    
    const server: Server = new Server();
    server.Start(); 
}

console.log('stating the server');
bootstrap();
