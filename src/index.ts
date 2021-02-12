/**
 * Index.ts
 * Main code that launches everything.
 */
import express from 'express';
import appStart from './init/appStart';
import cors from 'cors';
import * as dotenv from 'dotenv';

// Environment Variable initialization (charges from .env)
dotenv.config();

// Expressjs initialization
const app = express();
app.use(cors());

// Start the api
appStart(app);
