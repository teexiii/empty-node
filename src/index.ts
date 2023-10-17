import express from 'express';
import fs from 'fs';
import main from './router/main';
import http from 'http';
import https from 'https';
import { Config } from '@/modules/AppConfig';
// import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { toBool } from 'diginext-utils/dist/object';
const env = dotenv.config({ path: '.env' })?.parsed || {};

const BASE_PATH = Config.BASE_PATH;
const PORT = Config.PORT;
const app = express();
// app.use(bodyParser.json({ limit: '30mb' })); // Use this after the variable declaration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Use this after the variable declaration
let server;

if (toBool(env.USE_HTTPS)) {
    server = https.createServer(
        {
            key: fs.readFileSync('cert/private.key'),
            cert: fs.readFileSync('cert/sap-canvas-maker.zii.vn.crt'),
        },
        app
    );
} else {
    server = http.createServer(app);
}
server.listen(PORT, onConnect);

// /**
//  * Express config
//  */
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS, HEAD');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

// Mở lộ ra path cho HEALTHCHECK & APIs (nếu có)
app.use(`/${BASE_PATH}`, main);

async function onConnect() {
    console.log('Server handle at port ' + PORT);
}

export { app, server };
