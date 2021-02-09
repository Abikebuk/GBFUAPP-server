import express from 'express';
import CONFIG from './init/configLoader';
import appStart from './init/appStart';
import cors from 'cors';

const port = CONFIG.SERVER.dev.port;
const app = express();
app.use(cors());

appStart(app, port);
