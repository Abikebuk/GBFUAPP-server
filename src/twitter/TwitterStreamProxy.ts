/**
 * TwitterStreamProxy.ts
 * Create a proxy of a Twitter Stream
 */
import TwitterLite from 'twitter-lite/dist';
import tweetConvert from './tweetConvert';
import Tweet from '../model/Tweet';
import RaidFinderResponse from '../model/RaidFinderResponse';
import parseText from './parseText';
import Raid from '../model/Raid';
import RaidList from '../mongoose/RaidList';
import { Server } from 'socket.io';

/**
 * Class TwitterStreamProxy
 * Creates a Proxy of a Twitter Stream
 */
class TwitterStreamProxy {
    /**
     * Constructor
     * @param source, Twitter Stream
     * @param raidList, a RaidList (that contains raids data)
     * @param httpServer
     */
    constructor(source: TwitterLite.Stream, raidList: RaidList, io: Server) {
        console.log('constructing proxy...');
        // Fetch the stream
        source.on('data', (tweet: Tweet) => {
            const raid: Raid | null = parseText(tweet.lang, tweet.text);
            // Response reception can be wrong
            if (raid !== null)
                raidList.check(raid).then(() => {
                    const res: RaidFinderResponse | null = tweetConvert(tweet, raid);
                    // Check if (!=null), parsing could be done
                    if (res !== null) io.emit('raid_backup_request', JSON.stringify(res));
                });
        });
    }
}

export default TwitterStreamProxy;
