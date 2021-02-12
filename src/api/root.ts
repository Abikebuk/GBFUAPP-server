/**
 * Root.ts
 */
import { Express } from 'express';
import CONFIG from '../init/configLoader';

/**
 * Root of the app.
 * Doesn't have any real uses for the moment.
 * @param app
 * @param route
 */
function root(app: Express, route: string): void {
    app.get(route, (req, res) => {
        res.send(`<h1>${CONFIG.SERVER.app.name} is running</h1>`);
    });
}

export default root;
