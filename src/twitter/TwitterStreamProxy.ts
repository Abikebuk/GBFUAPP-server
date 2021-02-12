/**
 * TwitterStreamProxy.ts
 * Create a proxy of a Twitter Stream
 */
import TwitterLite from 'twitter-lite/dist';
import tweetConvert from './tweetConvert';
import Tweet from '../model/Tweet';
import { Readable } from 'stream';
import RaidFinderResponse from '../model/RaidFinderResponse';
import parseText from './parseText';
import Raid from '../model/Raid';
import RaidList from '../mongoose/RaidList';

/**
 * Class TwitterStreamProxy
 * Creates a Proxy of a Twitter Stream
 */
class TwitterStreamProxy {
    /**
     * Readable Stream
     */
    readable: Readable;

    /**
     * Constructor
     * @param source, Twitter Stream
     * @param raidList, a RaidList (that contains raids data)
     */
    constructor(source: TwitterLite.Stream, raidList: RaidList) {
        this.readable = new Readable({
            objectMode: true,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            read() {},
        });
        this.readable.setEncoding('utf-8'); // For special characters
        // Fetch the stream
        source.on('data', (tweet: Tweet) => {
            const raid: Raid | null = parseText(tweet.lang, tweet.text);
            // Response reception can be wrong
            if (raid !== null)
                raidList.check(raid).then(() => {
                    const res: RaidFinderResponse | null = tweetConvert(tweet, raid);
                    // Check if (!=null), parsing could be done
                    if (res !== null) this.readable.push(JSON.stringify(res));
                });
        });
    }
}

export default TwitterStreamProxy;
