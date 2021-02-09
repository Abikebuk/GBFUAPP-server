/**
 * Tweet type
 * Complete structure of Twitter's tweet response.
 */

type Tweet = {
    // Example left in comment.
    created_at: string; // 'Sat Jan 09 10:19:26 +0000 2021';
    id: number; // 1347850460015730700;
    id_str: string; // '1347850460015730690';
    text: string; // 'CFE049E1 :参戦ID\n参加者募集！\nLv150 プロトバハムート\nhttps://t.co/bC1ScmO9JT';
    source: string; // '<a href="http://granbluefantasy.jp/" rel="nofollow">グランブルー ファンタジー</a>';
    truncated: boolean; // false;
    in_reply_to_status_id: number | null; //null;
    in_reply_to_status_id_str: string | null; // null;
    in_reply_to_user_id: string | null; // null;
    in_reply_to_user_id_str: string | null; // null;
    in_reply_to_screen_name: string | null; //null;
    user: {
        id: number; // 765914336082686000;
        id_str: string; // '765914336082685952';
        name: string; // 'RMLU1227';
        screen_name: string; // 'RMLU1227';
        location: string; // '大分 大分市';
        url: string | null; // null;
        description: string; // 'グラブル メインでやってます！ フォローよろしくです！';
        translator_type: string; // 'none';
        protected: boolean; // false;
        verified: boolean; // false;
        followers_count: number; // 13;
        friends_count: number; // 16;
        listed_count: number; // 0;
        favourites_count: number; // 185;
        statuses_count: number; // 5176;
        created_at: Date; // 'Wed Aug 17 14:13:02 +0000 2016';
        utc_offset: unknown | null; // TODO : define it
        time_zone: unknown | null; // TODO : define it
        geo_enabled: boolean; // true;
        lang: string | null; // null;
        contributors_enabled: boolean; // false;
        is_translator: boolean; //false;
        profile_background_color: string; //'F5F8FA';
        profile_background_image_url: string; //'';
        profile_background_image_url_https: string; //'';
        profile_background_tile: boolean; //false;
        profile_link_color: string; //'1DA1F2';
        profile_sidebar_border_color: string; //'C0DEED';
        profile_sidebar_fill_color: string; //'DDEEF6';
        profile_text_color: string; //'333333';
        profile_use_background_image: boolean; //true;
        profile_image_url: string; //'http://pbs.twimg.com/profile_images/1239110130660028417/iVtzQZhA_normal.jpg';
        profile_image_url_https: string; //'https://pbs.twimg.com/profile_images/1239110130660028417/iVtzQZhA_normal.jpg';
        profile_banner_url: string; //'https://pbs.twimg.com/profile_banners/765914336082685952/1530756328';
        default_profile: boolean; //true;
        default_profile_image: boolean; //false;
        following: unknown | null; // TODO : define it
        follow_request_sent: unknown | null; // TODO : define it
        notifications: unknown | null; // TODO : define it
    };
    geo: unknown | null; // TODO : define it
    coordinates: unknown | null; // TODO : define it
    place: unknown | null; // TODO : define it
    contributors: unknown | null; // TODO : define it
    is_quote_status: boolean; //false;
    quote_count: number; //0;
    reply_count: number; //0;
    retweet_count: number; //0;
    favorite_count: number; //0;
    entities: {
        hashtags: [unknown]; // TODO : define it
        urls: [unknown]; // TODO : define it
        user_mentions: [unknown]; // TODO : define it
        symbols: [unknown]; // TODO : define it
        media: [unknown]; // TODO : define it
    };
    extended_entities: { media: [unknown] }; // TODO : define it
    favorited: boolean; // false;
    retweeted: boolean; // false;
    possibly_sensitive: boolean; // false;
    filter_level: string; // 'low';
    lang: string; // 'ja';
    timestamp_ms: string; // '1610187566175';
};

export default Tweet;
