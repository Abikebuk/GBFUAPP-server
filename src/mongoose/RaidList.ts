/**
 * RaidList.ts
 * Manage the list of raids and its data.
 */
import MongoRaid from './model/MongoRaid';
import { Document } from 'mongoose';
import Raid from '../model/Raid';
import searchRaidURL from '../scrapper/searchRaidURL';
import parseTweetDeck from '../scrapper/parseTweetDeck';
import TweetDeck from '../model/TweetDeck';
import CONFIG from '../init/configLoader';

/**
 * Type R
 * Raid data type.
 */
type R = { nameEN: string; nameJA: string; level: number };

/**
 * Class RaidList
 * Create and manage a list of Raid with its data
 */
class RaidList {
    /**
     * List of raid
     */
    list: R[];
    /**
     * checks list is initialized
     */
    initialized: boolean;

    /**
     * Constructor
     */
    constructor() {
        this.list = [];
        this.initialized = false;
    }

    /**
     * Initialize the connection with the database and load its data
     */
    public async init(): Promise<void> {
        await MongoRaid.find()
            .exec()
            .then(async (res) => {
                for (const raid of res) {
                    await this.pushDoc(raid);
                }
            });
        this.initialized = true;
    }

    /**
     * push a Document into the list
     * @param raid, raid data from the database
     * @private
     */
    private async pushDoc(raid: Document) {
        this.list.push({
            nameEN: raid.get('nameEN'),
            nameJA: raid.get('nameJA'),
            level: raid.get('level'),
        });
    }

    /**
     * return the list and initialize it if not already initialized.
     */
    public async get(): Promise<R[]> {
        if (!this.initialized) await this.init();
        return this.list;
    }

    /**
     * check if a raid already exists in the database and adds it if it doesn't exists.
     * @return number
     *  From -2 to 0 it doesn't change anything.
     *  -2 Database error.
     *  -1 either parsing or wiki search error.
     *  0 either language is japanese or the raid already exists
     *  From 1
     */
    public async check(raid: Raid): Promise<number> {
        if (raid.lang == 'ja') return 0; // Wiki search tool is not efficient with japanese names
        // TODO : separate function for exclusion
        // Exclusion handling
        let isExclusion = false;
        CONFIG.RAIDS.exclude.forEach((exclusion) => {
            if (raid.name == exclusion) {
                // console.log(`Excluded: ${exclusion}`);
                isExclusion = true;
            }
        });
        if (isExclusion) return 0;
        // ********************************* till this part
        if (this.exist(raid)) return 0;
        console.log(raid.name);
        const url = await searchRaidURL(raid.name);
        if (url == null) return -1;
        console.log(`### New raid found: ${raid.name}`);
        const tweetDeck: (TweetDeck | null)[] = await parseTweetDeck(url);
        let isNullArray = true;
        if (tweetDeck !== []) {
            console.log(tweetDeck);
            for (const td of tweetDeck) {
                if (td !== null) {
                    isNullArray = false;
                    // Recheck every TweetDeck's raids exist to prevent duplicates
                    if (!this.existTweetDeck(td)) {
                        await this.list.push({
                            nameEN: td.nameEN,
                            nameJA: td.nameJA,
                            level: td.level,
                        });
                        await new MongoRaid({
                            nameEN: td.nameEN,
                            nameJA: td.nameJA,
                            level: td.level,
                            groupName: '',
                            impossible: false,
                            wikiLink: url,
                        }).save((err) => {
                            console.log(err);
                            return -2;
                        });
                    } else {
                        console.log(`Duplicate found: Level - ${td.level} ${td.nameEN} / ${td.nameJA}`);
                    }
                }
            }
        }
        if (tweetDeck == [] || isNullArray) {
            await this.list.push({
                nameEN: raid.name,
                nameJA: '',
                level: raid.level,
            });
            await new MongoRaid({
                nameEN: raid.name,
                nameJA: '',
                level: raid.level,
                groupName: '',
                impossible: false,
                wikiLink: url,
            }).save((err) => {
                console.log(err);
                return -2;
            });
        }
        return 1;
    }

    /**
     * checks if a Raid exist in the list
     * @param raid
     * @private
     */
    private exist(raid: Raid): boolean {
        let levelChecked = false;
        let raidExist = false;
        let i = 0;
        // @TODO : check | From my knowledge there is no level on some raids but those have unique name
        // This next line permits to skip the level comparison
        if (raid.level == -999) levelChecked = true;
        while (!raidExist && i < this.list.length) {
            const r = this.list[i];
            if (RaidList.compareName(raid, r) && (levelChecked || RaidList.compareLevel(raid, r))) {
                raidExist = true;
            }
            i++;
        }
        return raidExist;
    }

    /**
     * check if a raid exists by comparing a TweetDeck with the raid list
     * @param td : TweetDeck
     * @private
     */
    private existTweetDeck(td: TweetDeck): boolean {
        this.list.forEach((r) => {
            if (td.nameEN == r.nameEN && td.level == r.level) return true;
        });
        return false;
    }

    /**
     * Compare if names of a Raid and a "R" (raid type) are the same
     * @param raid
     * @param r
     * @private
     */
    private static compareName(raid: Raid, r: R) {
        const rName = raid.name;
        const lNameEN = r.nameEN;
        const lNameJA = r.nameJA;
        return rName == lNameEN || rName == lNameJA;
    }

    /**
     * Compare if level of a Raid and a "R" (raid type) are the same
     * @param raid
     * @param r
     * @private
     */
    private static compareLevel(raid: Raid, r: R) {
        return raid.level == r.level;
    }
}

export default RaidList;
