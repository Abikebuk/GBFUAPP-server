import { Express } from 'express';
import { Readable } from 'stream';

function raids(app: Express, route: string, stream: Readable): number {
    app.get(route, (req, res) => {
        //res.setHeader('Content-Type', 'application/json; charset=utf-8');
        //res.setHeader('Access-Control-Allow-Origin', '*');
        res.header({
            'content-type': 'application/json; charset=utf-8',
            'access-control-allow-origin': '*',
        });
        let counter = 0;
        stream.on('data', (data) => {
            console.log(counter);
            try {
                if (counter < 50) {
                    counter++;
                    res.write(data);
                } else {
                    console.log('end of counter =', counter);
                    res.end('');
                }
            } catch (e) {}
        });
    });
    return 0;
}

export default raids;
