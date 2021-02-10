const TWITTER = {
    apiClient: {
        consumerKey: process.env.GBFUAPP_TWITTER_CONSUMER_KEY,
        consumerSecretKey: process.env.GBFUAPP_TWITTER_CONSUMER_KEY_SECRET,
        accessToken: process.env.GBFUAPP_ACCESS_TOKEN,
        accessTokenSecret: process.env.GBFUAPP_TWITTER_ACCESS_TOKEN_SECRET,
    },
    streamParameters: {
        en: {
            track: 'battle ID I need backup!',
        },
        jp: {
            track: ':参戦ID',
        },
    },
};

export default TWITTER;
