import TwitterLite from 'twitter-lite/dist';
import tweetConvert from './tweetConvert';
import Tweet from '../model/Tweet';
import { Readable } from 'stream';
import RaidFinderResponse from '../model/RaidFinderResponse';
import parseText from './parseText';
import Raid from '../model/Raid';
import RaidList from '../mongoose/RaidList';

class TwitterStreamProxy {
    readable: Readable;
    constructor(source: TwitterLite.Stream, raidList: RaidList) {
        this.readable = new Readable({
            objectMode: true,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            read() {},
        });
        this.readable.setEncoding('utf-8');
        source.on('data', (tweet: Tweet) => {
            const raid: Raid | null = parseText(tweet.lang, tweet.text);
            if (raid !== null)
                raidList.check(raid).then(() => {
                    const res: RaidFinderResponse | null = tweetConvert(tweet, raid);
                    if (res !== null) this.readable.push(JSON.stringify(res));
                });
        });
    }
}

export default TwitterStreamProxy;
