/**
 * connect.ts
 * Connects to the MongoDB Database.
 */
import { Connection } from 'mongoose';
import mongoose from 'mongoose';

/**
 * connect to the MongoDB database.
 */
function connect(): Connection {
    mongoose
        .connect(String(process.env.GBFUAPP_DATABASE_HOST), { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('MongoDB, Connection Success');
        })
        .catch((e) => {
            console.log('MongoDB, Connection failed');
            console.log(e);
        });
    const db = mongoose.connection;
    db.collection('raids').createIndex({ nameEN: 1, nameJA: 1, level: 1 }, { unique: true });
    return db;
}
export default connect;
