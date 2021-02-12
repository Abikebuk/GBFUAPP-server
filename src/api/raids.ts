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
function raids(app: Express, route: string, stream: Readable): number {
    app.get(route, (req, res) => {
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
                    res.end();
                    return;
                }
            } catch (e) {}
        });
    });
    return 0;
}

export default raids;
