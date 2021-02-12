/**
 * Twit.ts
 * Connects the api to Twitter
 */
import CONFIG from '../init/configLoader';
import Twitter from 'twitter-lite';
import { Stream } from 'twitter-lite/dist';

/**
 * Class Twit
 * Connects the api to Twitter.
 */
class Twit {
    /**
     * Instantiate the connection.
     * @private
     */
    private client = new Twitter({
        consumer_key: String(process.env.GBFUAPP_TWITTER_CONSUMER_KEY),
        consumer_secret: String(process.env.GBFUAPP_TWITTER_CONSUMER_KEY_SECRET),
        access_token_key: String(process.env.GBFUAPP_ACCESS_TOKEN),
        access_token_secret: String(process.env.GBFUAPP_TWITTER_ACCESS_TOKEN_SECRET),
    });

    /**
     * Fetch a Twitter Stream.
     */
    public getRaidStream(): Stream {
        return this.client.stream('statuses/filter', Twit.getStatusesFilterParameters()).on('start', () => {
            console.log('Fetching Twitter raid stream.');
        });
    }

    /**
     * Get the list of filters from config/twitter.js
     * @private
     */
    private static getStatusesFilterParameters() {
        return {
            track: `${CONFIG.TWITTER.streamParameters.en.track},${CONFIG.TWITTER.streamParameters.jp.track}`,
        };
    }
}

export default Twit;
