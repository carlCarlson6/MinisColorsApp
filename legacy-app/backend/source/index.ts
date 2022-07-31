import { Server } from "./infrastructure/api/Server";
import { config as readEnvConfig } from "dotenv";

const bootstrap = async () => {
    const server: Server = new Server();
    server.Start(); 
}

console.info('stating the server');
readEnvConfig();
bootstrap();
