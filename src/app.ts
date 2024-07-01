import cors, { CorsOptions } from 'cors';
import { config } from 'dotenv';
import express, { Request, Response, NextFunction, Application, ErrorRequestHandler, urlencoded } from 'express';
import helmet from 'helmet'
import apiRoutes from './routes/api.route';

config();

const corsOptions: CorsOptions = {
    origin: true,
};

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
};

const app: Application = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

const APP_NAME: string = process.env.APP_NAME as string;

app.get('/', (req: Request, res: Response, _next: NextFunction) => {
    res.send(`🚀 ${APP_NAME} is running`);
});

app.use('/api', apiRoutes);


export default app;