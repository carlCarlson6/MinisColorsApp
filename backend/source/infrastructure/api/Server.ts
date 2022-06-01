import 'reflect-metadata';
import express, {Express} from 'express';
import { PaintsRoutes } from './PaintsRoutes';
import cors from 'cors';

export class Server {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || 4000);

        this.ApplyMiddleware();
        this.AddRoutes();
    }

    private ApplyMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private AddRoutes() {
        const paintsRoutes = new PaintsRoutes();
        this.app.use(paintsRoutes.path, paintsRoutes.router);
    }
    
    public Start() {
        this.app.listen(this.app.get('port'), '0.0.0.0', () => console.info('the server is running on', this.app.get('port')));
    }
}
