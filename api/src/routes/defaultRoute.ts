import { Request, Response, Router } from 'express';
import mongoDB from '../db';

export const defaultRoute = Router();

defaultRoute.get('/', async (req: Request, res: Response) => {
    res.render("index", {});
});
