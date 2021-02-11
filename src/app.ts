import express from 'express';
import CONFIG from './init/configLoader';
import appStart from './init/appStart';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
const port = CONFIG.SERVER.dev.port;
const app = express();
app.use(cors());

appStart(app, port);
