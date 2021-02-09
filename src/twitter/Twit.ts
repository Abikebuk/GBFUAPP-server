import CONFIG from '../init/configLoader';
import Twitter from 'twitter-lite';
import { Stream } from 'twitter-lite/dist';

class Twit {
    private client = new Twitter({
        consumer_key: CONFIG.TWITTER.apiClient.consumerKey,
        consumer_secret: CONFIG.TWITTER.apiClient.consumerSecretKey,
        access_token_key: CONFIG.TWITTER.apiClient.accessToken,
        access_token_secret: CONFIG.TWITTER.apiClient.accessTokenSecret,
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
