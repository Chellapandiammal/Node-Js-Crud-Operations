import { config } from 'dotenv';
import app from './app';
import {dbConfig} from './config/db.config';

config();

dbConfig.sync().then(() => {
    console.log(`✓ Database Connected`);
}).catch((error: any) => {
    console.log(`🔴 Database Connection Error: ${error}`);
});

const APP_URL: string = process.env.APP_URL as string;
const APP_PORT: number = parseInt(process.env.APP_PORT as string);

app.listen(APP_PORT, () => {
    console.log(`✓ ${APP_URL}:${APP_PORT}`);
});