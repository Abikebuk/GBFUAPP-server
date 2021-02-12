/**
 * raid.ts
 */
import { Express } from 'express';
import { Readable } from 'stream';

/**
 * stream processed raids from a Twitter's stream
 * @param app
 * @param route
 * @param stream
 */
let i = 0;
function raids(app: Express, route: string, stream: Readable): number {
    app.get(route, (req, res) => {
        i++;
        res.header({
            'content-type': 'application/json; charset=utf-8',
            'access-control-allow-origin': '*',
        });
        let counter = 0;
        stream.on('data', (data) => {
            console.log(counter);
            if (counter < 50) {
                counter++;
                res.write(data);
            } else {
                console.log(i, ' end of counter =', counter);
                res.end();
                return;
            }
        });
    });
    return 0;
}

export default raids;
