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
        const j = i;
        res.header({
            'content-type': 'application/json; charset=utf-8',
            'access-control-allow-origin': '*',
            Connection: 'close',
        });
        res.setTimeout(5000);
        let counter = 0;
        stream.on('data', (data) => {
            if (counter < 50) {
                //TODO : Check never closing connection
                //console.log(`${j} : ${counter}`);
                counter++;
                res.write(data);
            } else {
                //console.log(j, ' end of counter =', counter);
                res.end('end');
            }
        });
    });
    return 0;
}

export default raids;
