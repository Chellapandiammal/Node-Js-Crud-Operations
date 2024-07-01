    import { Request, RequestHandler, Response } from 'express';
import { Product } from '../models/product.model';
import Joi from 'joi';

const index: RequestHandler = async (req: Request, res: Response) => {
    try {
        const products: Product[] = await Product.findAll();
        return res.status(200).json({ status: true, data: products });
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

const show: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product: Product | null = await Product.findByPk(id);
        if(!product) {
            return res.status(404).json({ status: false, data: null });
        }
        return res.status(200).json({ status: true, data: product });
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message });
    }
};  

const store: RequestHandler = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
        });
        if(schema.validate(req.body).error) {
            const errorMessage = schema.validate(req.body).error?.details;
            return res.status(422).json({ status: false, message: errorMessage });
        }

        const { name } = req.body;

        const product: Product = await Product.create({ name });
        return res.status(201).json({ status: true, data: product });
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

const update: RequestHandler = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
        });
        if(schema.validate(req.body).error) {
            const errorMessage = schema.validate(req.body).error?.details;
            return res.status(422).json({ status: false, message: errorMessage });
        }

        const { id } = req.params;
        const { name } = req.body;
        const product: Product | null = await Product.findByPk(id);
        if(!product) {
            return res.status(404).json({ status: false, data: null });
        }

        await product.update({name});
        return res.status(200).json({ status: true, data: product });
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

const destroy: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product: Product | null = await Product.findByPk(id);
        if(!product) {
            return res.status(404).json({ status: false, data: null });
        }
        await product.destroy();
        return res.status(200).json({ status: true, data: null });
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

export { index, show, store, update, destroy  };