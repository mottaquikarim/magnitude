var Hapi = require('hapi');
var GitHubCurl = require('./GitHubCurl');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 3000,
    routes: { cors: true }
});

server.route({
    method: 'GET',
    path:'/code/{code}', 
    handler: GitHubCurl
});

// Start the server
server.start();
