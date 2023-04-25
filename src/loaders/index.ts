import { Express } from 'express';
import express from '../loaders/express';

export default (app: Express) => {
    express(app);
};
