/**
 * listen.ts
 * listen a port
 */
import { Express } from 'express';
import CONFIG from '../init/configLoader';
import * as http from 'http';

/**
 * listen to a port
 * @param app
 * @param port
 */
function listen(app: Express, port: number): http.Server {
    const server = app.listen(port, () => {
        console.log(`${CONFIG.SERVER.app.name} is running on port ${port}`);
    });
    server.keepAliveTimeout = 5000;
    return server;
}

export default listen;
