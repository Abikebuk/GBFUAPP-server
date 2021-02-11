import CONFIG from '../init/configLoader';
import Twitter from 'twitter-lite';
import { Stream } from 'twitter-lite/dist';

class Twit {
    private client = new Twitter({
        consumer_key: String(process.env.GBFUAPP_TWITTER_CONSUMER_KEY),
        consumer_secret: String(process.env.GBFUAPP_TWITTER_CONSUMER_KEY_SECRET),
        access_token_key: String(process.env.GBFUAPP_ACCESS_TOKEN),
        access_token_secret: String(process.env.GBFUAPP_TWITTER_ACCESS_TOKEN_SECRET),
    });

    public getRaidStream(): Stream {
        return this.client.stream('statuses/filter', this.getStatusesFilterParameters()).on('start', () => {
            console.log('Fetching Twitter raid stream.');
        });
    }

    private getStatusesFilterParameters() {
        return {
            track: `${CONFIG.TWITTER.streamParameters.en.track},${CONFIG.TWITTER.streamParameters.jp.track}`,
        };
    }
}

export default Twit;
