import { Express } from 'express';
import { Readable } from 'stream';

let counter = 0;

function raids(app: Express, route: string, stream: Readable): number {
    app.get(route, (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        stream.on('data', (data) => {
            if (counter < 500) {
                counter++;
                res.write(data);
            } else {
                counter = 0;
                res.end('');
            }
        });
    });
    return 0;
}

export default raids;
