import { Express } from 'express';
import MongoRaid from '../mongoose/model/MongoRaid';
function raidsData(app: Express, route: string): void {
    let data: Document[] = [];
    MongoRaid.find((callback, list) => {
        data = list;
    });
    app.get(route, (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.send(JSON.stringify(data, null, ' '));
    });
}

export default raidsData;
