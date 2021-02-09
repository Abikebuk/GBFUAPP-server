import CONFIG from '../init/configLoader';
import { Connection } from 'mongoose';
import mongoose from 'mongoose';

function connect(): Connection {
    mongoose
        .connect(CONFIG.SERVER.dev.db_host, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('MongoDB, Connection Success');
        })
        .catch(() => {
            console.log('MongoDB, Connection failed');
        });
    const db = mongoose.connection;
    db.collection('raids').createIndex({ nameEN: 1, nameJA: 1, level: 1 }, { unique: true });
    return db;
}
export default connect;
