#GBFUAPP - Server 
GBFUAPP (Granblue Fantasy Utility Application) is a project wanting to bring multiples tools for the game Granblue Fantasy.  
Server part of the project.  
This version only contains a prototype of a "raid finder".

## Feature
* **Raid Finder:** Fetch the "backup request" from player asking for help in the game. It takes advantage of the  in-game function of backup request on Twitter.
    * Real-time gathering of Tweets of players asking for help then process and stream the data.
    * Self-building database and translation ``ja <-> en`` of unregistered raids. Checks information on the [(unofficial) english wiki](https://gbf.wiki/)
##Installation
**This project only contains the API that gathers and process data. It is meant to be used with a client which you can find [here](https://github.com/Abikebuk/GBFUAPP-client)**

You need the following dependencies to get started:
* A MongoDB database
* 
Use your favorite package manager to install the dependencies.
```shell
npm install
or
yarn install
```

Either set the following environment variables or create a ``.env`` file in the root with the following content.
```dotenv
## Port of the app
GBFUAPP_PORT=80 
## MongoDB database uri. Should be in the following format:
## mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
GBFUAPP_DATABASE_HOST=mongodb://username:pass@hostname/database1
## Twitter access tokens & consummer keys
## Got to https://developer.twitter.com/ to get them
GBFUAPP_ACCESS_TOKEN=some_twitter_access_token
GBFUAPP_TWITTER_ACCESS_TOKEN_SECRET=some_twitter_access_token_secret
GBFUAPP_TWITTER_CONSUMER_KEY=some_twitter_consummer_key
GBFUAPP_TWITTER_CONSUMER_KEY_SECRET=some_twitter_consummer_key_secret
```

## Usage
Build the project with:
```shell
npm run build
```
Then, run the project with:
```shell
npm run start
or
node build/index.js
```
Alternatively, you can use the shortcut that do both of the previous commands:
```shell
npm run start:dev
```

## API Endpoints
Per default, the following endpoints exist:
* ``/`` prints that the server has started
* ``/raids`` returns a list of raids from backup requests in real time
* ``/raidsData`` returns the data of registered raids (such as, english/japanese name, type, wiki url,...)  
The route of the endpoints are customizable by editing ``/src/init/appStart.ts``
## Licence
This project is under [MIT](https://choosealicense.com/licenses/mit/) Licence.