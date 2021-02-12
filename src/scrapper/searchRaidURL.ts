/**
 * searchRaidURL.ts
 * Search URL of a raid in the wiki
 */
import CONFIG from '../init/configLoader';
import axios from 'axios';
import cheerio from 'cheerio';

/**
 * Search url of a raid in the wiki
 * @param query
 */
async function searchRaidURL(query: string): Promise<string | null> {
    let q = query.trim().replace(/ /g, '_');
    // TODO: Exception handling function
    if (q == 'Huanglong_&_Qilin_(Impossible)') q = 'Huanglong_and_Qilin_(Raid)'; // Some exception
    console.log(`### Searching for url of [${query}]`);
    const raid = `${CONFIG.SERVER.dev.wikiURL}/${q}_(Raid)`;
    const impossible = `${CONFIG.SERVER.dev.wikiURL}/${q}_(Impossible)`;
    const noSuffix = `${CONFIG.SERVER.dev.wikiURL}/${q}`;
    let url = await checkUrl(raid);
    if (url == null) url = await checkUrl(impossible);
    if (url == null) url = await checkUrl(noSuffix);
    if (url == null) url = await searchRaid(query);
    console.log(`url: ${url}`);
    return url;
}

/**
 * Check if url exists
 * @param url
 */
async function checkUrl(url: string): Promise<string | null> {
    url = encodeURI(url);
    try {
        await axios.get(url);
    } catch (e) {
        return null;
    }
    return url;
}

/**
 * Use the search function of the wiki and returns the url first result (if it exists)
 * @param query
 */
async function searchRaid(query: string): Promise<string | null> {
    const q = query.trim().replace(' ', '+');
    const url = encodeURI(`${CONFIG.SERVER.dev.wikiURL}/?search=${q}`);
    let searchResult = '';
    try {
        const searchPage = await axios.get(url);
        const $ = cheerio.load(searchPage.data);
        const temp = $('div[class=searchresults] li[class=mw-search-result] a').attr('href');
        if (temp != undefined) searchResult = temp;
    } catch (e) {}
    if (searchResult == '') return null;
    return `${CONFIG.SERVER.dev.wikiURL}${searchResult}`;
}

export default searchRaidURL;
