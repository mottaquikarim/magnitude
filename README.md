# Installation

1. Go into app/
2. in GitHubAPI/config, add your client key + localhost pointer
3. run `npm install` in app/ dir
4. G into server/
5. in GitHubCurl.js, add your client secret
6. run `npm install` in server/
7. run `node index.js` in server/ dir
8. meanwhile, back at the ranch (app/), run `./node_modules/.bin/gulp`

Gulp will monitor your js file changes while the node server will curl your github access token. 

Happy coding!
