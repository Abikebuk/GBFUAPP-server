import TweetDeck from '../model/TweetDeck';
import axios from 'axios';
import cheerio from 'cheerio';

/**
 * Parse a webpage looking for TweetDecks.
 * @param url
 */
async function parseTweetDeck(url: string): Promise<(TweetDeck | null)[]> {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    const parsedText = $('body')
        .text()
        .match(/(TweetDeck: .*)/g);
    if (parsedText == null || parsedText?.length == 0) return [];
    return parseEachLine(parsedText);
}

/**
 * Parse each TweetDecks lines found into TweetDecks { level, nameEN, nameJA }
 * @param parsedText
 */
function parseEachLine(parsedText: RegExpMatchArray): (TweetDeck | null)[] {
    const res: (TweetDeck | null)[] | undefined = parsedText?.map((str: string): TweetDeck | null => {
        let match = str.match('TweetDeck: Lvl ([0-9]{2,3}) (.*) Lv[0-9]{2,3} (.*)');
        // If parsing fails, it's likely due to some HL raids without levels on it
        if (match == null) {
            // This regular expression takes as hypothesis that the first character of the japanese name is not a letter or a number
            match = str.match('TweetDeck: ([A-Za-z0-9 ()&]*)(.*)');
            if (match?.length == 3) {
                return {
                    level: -999,
                    nameEN: match[1].trim(),
                    nameJA: match[2].trim(),
                };
            }
            // if first match succeed, raids are processed here
        } else if (match?.length == 4) {
            return {
                level: parseInt(match[1]),
                nameEN: match[2].trim(),
                nameJA: match[3].trim(),
            };
        }
        return null;
    });
    if (res == undefined) return [];
    return res;
}

export default parseTweetDeck;
