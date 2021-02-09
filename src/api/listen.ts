import { Express } from 'express';
import CONFIG from '../init/configLoader';

function listen(app: Express, port: number): void {
    app.listen(port, () => {
        console.log(`${CONFIG.SERVER.app.name} is running on port ${port}`);
    });
}

export default listen;
