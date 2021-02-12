import { Express } from 'express';
import { Readable } from 'stream';

let counter = 0;

function raids(app: Express, route: string, stream: Readable): number {
    app.get(route, (req, res) => {
        //res.setHeader('Content-Type', 'application/json; charset=utf-8');
        //res.setHeader('Access-Control-Allow-Origin', '*');
        res.header({
            'content-type': 'application/json; charset=utf-8',
            'access-control-allow-origin': '*',
        });
        stream.on('data', (data) => {
            counter++;
            console.log(counter);
            if (counter < 50) {
                res.write(data);
            } else {
                console.log('end of counter =', counter);
                counter = 0;
                res.end('');
            }
        });
    });
    return 0;
}

export default raids;
