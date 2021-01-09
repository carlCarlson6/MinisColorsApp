import { Server } from "./api/Server";

const bootstrap = async () => {
    console.log('stating the server');
    const server: Server = new Server();
    server.Start(); 
}

bootstrap();
