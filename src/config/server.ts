const SERVER = {
    app: {
        name: 'Project G - Server side',
    },
    dev: {
        port: 8080,
        db_host: process.env.GBFUAPP_DATABASE_HOST,
        wikiURL: 'https://gbf.wiki',
    },
};
export default SERVER;
