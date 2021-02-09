import Raid from '../model/Raid';

const regJA = '(.*)?([0-9A-Za-z]{8}) :参戦ID\n' + '参加者募集！\n' + '(Lv([0-9]{2,3}) )?(.*)';
const regEN = '(.*)?([0-9A-Za-z]{8}) :Battle ID\n' + 'I need backup!\n' + '(Lvl ([0-9]{2,3}) )?(.*)';
/**
 * ParseText parse the text content of a backup request tweet into a Raid type {id, name, level, lang}
 * returns this raid.
 * @param lang, language code found in Tweet.lang
 * @param text, text content found in Tweet.text
 */
function parseText(lang: string, text: string): Raid | null {
    // ParsedText [ 0: text, 1: message, 2: id, 3: level(prefixed with "lv"), 4: level(only number), 5: name ]
    let parsedText: RegExpMatchArray | null = null;
    switch (lang) {
        case 'en':
            parsedText = text.match(regEN);
            // sometime, source is EN but text is written in JA
            if (parsedText == null) {
                parsedText = text.match(regJA);
                lang = 'ja';
            }
            break;
        case 'ja':
            parsedText = text.match(regJA);
            // sometime, source is JA but text is written in EN
            if (parsedText == null) {
                parsedText = text.match(regEN);
                lang = 'en';
            }
            break;
        default:
            return null;
    }
    if (parsedText) {
        const length = parsedText.length;
        // After parsing, parsedText has to have a length of
        if (length == 6) {
            if (parsedText[4] == undefined) {
                parsedText[4] = '-999';
            }
            const raid: Raid = {
                message: parsedText[1],
                id: parsedText[2],
                level: parseInt(parsedText[4]),
                name: parsedText[5].replace('&amp;', '&'),
                lang,
            };
            return raid;
        }
    }
    // If parsing fails, print the text & parsing output
    console.log('### parseText: Parse Error');
    console.log('===== TEXT =====');
    console.log(`lang = ${lang}`);
    console.log(text);
    console.log('================');

    return null;
}

export default parseText;
