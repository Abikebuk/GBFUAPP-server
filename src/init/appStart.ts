// libraries
import { Express } from 'express';
import Twit from '../twitter/Twit';
// Twitter
import TwitterStreamProxy from '../twitter/TwitterStreamProxy';
import connect from '../mongoose/connect';
import RaidList from '../mongoose/RaidList';
// Api
import root from '../api/root';
import listen from '../api/listen';
import raidsData from '../api/raidsData';
import { Server } from 'socket.io';

/**
 * Start every service of the api
 * @param app
 */
async function appStart(app: Express): Promise<number> {
    // Listen
    const httpServer = listen(app, Number(process.env.GBFUAPP_PORT));
    // Twitter & MongoDB database connection initialization
    const twit = new Twit();
    // Socket init
    const io = new Server(httpServer, { cors: { origin: '*' } });
    // eslint-disable-next-line no-unused-vars
    const db = connect();
    const raidList = await new RaidList();
    await raidList.get();
    // API
    const raidsFinderStream = new TwitterStreamProxy(twit.getRaidStream(), raidList, io);
    raidsData(app, '/raidsData');
    root(app, '/');
    //test(server);
    return 0;
}

export default appStart;
