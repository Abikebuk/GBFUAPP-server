/**
 * TweetConvert.ts
 * In charge of converting Twitter's stream into RaidFinderResponse model.
 */
import RaidFinderResponse from '../model/RaidFinderResponse';
import Raid from '../model/Raid';
import Tweet from '../model/Tweet';

/**
 * Convert one Tweet and convert it into RaidFinderResponse model.
 * @param tweet
 * @param raid
 */
function tweetConvert(tweet: Tweet, raid: Raid | null): RaidFinderResponse | null {
    if (raid == null) return null;
    const createdAt = new Date(tweet.created_at);
    const player = tweet.user.screen_name;
    const timeToServer: number = new Date().getTime() - createdAt.getTime();
    const raidFinderResponse: RaidFinderResponse = {
        createdAt,
        timeToServer,
        player,
        raid,
    };
    return raidFinderResponse;
}

export default tweetConvert;
