import * as mongoose from 'mongoose';
import RaidSchema from '../schema/RaidSchema';

const MongoRaid = mongoose.model('Raid', RaidSchema);

export default MongoRaid;
