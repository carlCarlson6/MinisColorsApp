import 'reflect-metadata';
import express, {Express} from 'express';
import morgan from 'morgan';
import { PaintsRoutes } from './paints/PaintsRoutes';
import cors from 'cors';

export class Server {
    private app: Express;

    constructor() {
        this.app = express();
        this.Config();
    }

    private Config() {
        this.app.set('port', process.env.PORT || 4000);
        this.ApplyMiddleware();
        this.AddRoutes();
    }

    private ApplyMiddleware() {
        this.app.use(express.json());

        const options: cors.CorsOptions = {
            allowedHeaders: [
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: 'http://localhost:3000/',
            preflightContinue: false,
          };

        const corsMiddlware = cors({credentials: true, origin:'http://localhost:3000/'});
        this.app.use(cors({origin:'http://localhost:3000/'}));
    }

    private AddRoutes() {
        const paintsRoutes: PaintsRoutes = new PaintsRoutes();
        this.app.use(paintsRoutes.path, paintsRoutes.router);
    }
    
    public Start() {
        this.app.listen(this.app.get('port'), '0.0.0.0', () => console.log('the server is running on', this.app.get('port')));
    }
}