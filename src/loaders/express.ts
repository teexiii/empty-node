import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
var bodyParser = require('body-parser');

export default (app: Express) => {
    process.on('uncaughtException', async (error) => {
        // console.log(error);
        console.log('uncaughtException', '', error.message, 'Uncaught Exception', '');
    });

    process.on('unhandledRejection', async (ex: any) => {
        // console.log(ex);
        console.log('unhandledRejection', '', ex.message, 'Unhandled Rejection', '');
    });

    // app.enable('trust proxy');
    app.use(cors());
    app.use(
        bodyParser.urlencoded({
            extended: false,
        })
    );
    app.use(bodyParser.json());
    app.use(compression());
    app.use(express.static('public'));
    app.disable('x-powered-by');
    app.disable('etag');

    app.get('/', (_req: any, res: any) => {
        return res
            .status(200)
            .json({
                status: 1,
            })
            .end();
    });

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Content-Security-Policy-Report-Only', 'default-src: https:');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT POST PATCH DELETE GET');
            return res.status(200).json({});
        }
        next();
    });

    app.use((_req, _res, next) => {
        const error = new Error('Endpoint could not find!') as any;
        error.status = 404;
        next(error);
    });

    app.use((error: any, req: any, res: any, _next: any) => {
        res.status(error.status || 500);
        let resultCode = '00015';
        let level = 'External Error';
        if (error.status === 500) {
            resultCode = '00013';
            level = 'Server Error';
        } else if (error.status === 404) {
            resultCode = '00014';
            level = 'Client Error';
        }
        console.log(resultCode, req?.user?._id ?? '', error.message, level, req);
        return res.json({
            resultMessage: {
                en: error.message,
                tr: error.message,
            },
            resultCode: resultCode,
        });
    });
};
