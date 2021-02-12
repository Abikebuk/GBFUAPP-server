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
import raids from '../api/raids';
import raidsData from '../api/raidsData';

/**
 * Start every service of the api
 * @param app
 */
async function appStart(app: Express): Promise<number> {
    // Twitter & MongoDB database connection initialization
    const twit = new Twit();
    // eslint-disable-next-line no-unused-vars
    const db = connect();
    const raidList = await new RaidList();
    console.log(await raidList.get());
    // API
    const raidsFinderStream = new TwitterStreamProxy(twit.getRaidStream(), raidList);
    raids(app, '/raids', raidsFinderStream.readable);
    raidsData(app, '/raidsData');
    root(app, '/');
    // Listen
    listen(app, Number(process.env.GBFUAPP_PORT));
    return 0;
}

export default appStart;
