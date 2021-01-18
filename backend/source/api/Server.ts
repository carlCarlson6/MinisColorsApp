import 'reflect-metadata';
import express, {Express} from 'express';
import morgan from 'morgan';
import { PaintsRoutes } from './paints/PaintsRoutes';

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
    }

    private AddRoutes() {
        const paintsRoutes: PaintsRoutes = new PaintsRoutes();
        this.app.use(paintsRoutes.path, paintsRoutes.router);
    }
    
    public Start() {
        this.app.listen(this.app.get('port'), '0.0.0.0', () => console.log('the server is running on', this.app.get('port')));
    }
}