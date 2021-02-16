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
const i = 0;
function raids(app: Express, route: string, stream: Readable): number {
    app.get(route, (req, res) => {
        res.header({
            'content-type': 'application/json; charset=utf-8',
            'access-control-allow-origin': '*',
            Connection: 'close',
        });
        res.setTimeout(5000);
        stream
            .on('data', (data) => {
                //TODO : Check never closing connection
                res.write(data);
            })
            .on('close', () => {
                console.log('client closed');
                res.end();
            });
    });
    return 0;
}

export default raids;
