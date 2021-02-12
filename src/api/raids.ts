import { Express } from 'express';
import { Readable } from 'stream';

let counter = 0;

function raids(app: Express, route: string, stream: Readable): number {
    app.get(route, (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        stream.on('data', (data) => {
            res.write(data);
            if (counter < 500) counter++;
            else {
                counter = 0;
                res.end('');
            }
            console.log(counter);
        });
    });
    return 0;
}

export default raids;
