import express from 'express';
import { defaultRoute } from './defaultRoute';
import { apiRoute } from './apiRoutes';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(apiRoute);
