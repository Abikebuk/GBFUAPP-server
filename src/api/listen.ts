/**
 * listen.ts
 * listen a port
 */
import { Express } from 'express';
import CONFIG from '../init/configLoader';

/**
 * listen to a port
 * @param app
 * @param port
 */
function listen(app: Express, port: number): void {
    const server = app.listen(port, () => {
        console.log(`${CONFIG.SERVER.app.name} is running on port ${port}`);
    });
    server.keepAliveTimeout = 5000;
}

export default listen;
