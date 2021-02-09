import { Express } from 'express';
import CONFIG from '../init/configLoader';

function root(app: Express, route: string): void {
    app.get(route, (req, res) => {
        res.send(`<h1>${CONFIG.SERVER.app.name} is running</h1>`);
    });
}

export default root;
