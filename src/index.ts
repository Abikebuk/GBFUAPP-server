import express from 'express';
import CONFIG from './init/configLoader';
import appStart from './init/appStart';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const port = CONFIG.SERVER.dev.port;
const index = express();
index.use(cors());

appStart(index, port);
