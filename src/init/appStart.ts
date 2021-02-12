//
import { Express } from 'express';
import Twit from '../twitter/Twit';
//
import TwitterStreamProxy from '../twitter/TwitterStreamProxy';
import connect from '../mongoose/connect';
import RaidList from '../mongoose/RaidList';
// Api
import root from '../api/root';
import listen from '../api/listen';
import raids from '../api/raids';
import raidsData from '../api/raidsData';

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

// Test ground
/*
function test() {
    const testRaid = new MongoRaid({
        nameEN: 'test',
        nameJA: 'test',
        level: 1,
        groupName: 'groupTest',
        impossible: false,
        wikiLink: '?',
    });
    testRaid.save(function (err, doc) {
        if (err) return console.error(err);
        console.log('saved');
    });
    MongoRaid.find((err, query) => {
        if (err) return console.error(err);
        console.log(query);
    });
}

async function test2() {
    const wiki = await axios.get('https://gbf.wiki/?search=Wicked+Rebel');
    const $ = cheerio.load(wiki.data);
    console.log($('div[class=searchresults] li[class=mw-search-result] a').attr('href'));
    //console.log(parseTweetDeck($));
}

async function test3(query: string): Promise<string | null> {
    return await searchRaidURL(query);
}
 */
