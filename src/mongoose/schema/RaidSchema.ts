/**
 * RaidSchema.ts
 */
import * as mongoose from 'mongoose';

/**
 * Schema of a Raid for the database
 */
const RaidSchema = new mongoose.Schema({
    nameEN: String,
    nameJA: String,
    level: Number,
    groupName: String,
    impossible: Boolean,
    wikiLink: String,
});

/**
 * Index 1, used for uniqueness check
 */
const RaidIndexEN = {
    nameEN: 1,
    level: 1,
};

/**
 * Index 2, used for uniqueness check
 */
const RaidIndexJA = {
    nameJA: 1,
    level: 1,
};

export default RaidSchema;
export { RaidIndexEN, RaidIndexJA };
