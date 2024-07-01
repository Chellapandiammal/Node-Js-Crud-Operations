import { config } from 'dotenv';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Product } from '../models/product.model';

config();

const options: SequelizeOptions = {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: false,
    models: [Product]
}

export const dbConfig = new Sequelize(options);

            