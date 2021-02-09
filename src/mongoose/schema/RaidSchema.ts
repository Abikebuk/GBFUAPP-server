import * as mongoose from 'mongoose';

const RaidSchema = new mongoose.Schema({
    nameEN: String,
    nameJA: String,
    level: Number,
    groupName: String,
    impossible: Boolean,
    wikiLink: String,
});

const RaidIndexEN = {
    nameEN: 1,
    level: 1,
};
const RaidIndexJA = {
    nameJA: 1,
    level: 1,
};

export default RaidSchema;
export { RaidIndexEN, RaidIndexJA };
