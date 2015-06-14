// singleton implementation of a routehandler
var Routes = require('./Routes/router');

// grab the view handlers
var Home = require('./Views/home');
var Repo = require('./Views/repo');
var Edit = require('./Views/edit');

// register routes
Routes.register( '/home', Home);
Routes.register( '/repo/:user/:repo', Repo);
Routes.register( '/edit/:user/:repo', Edit);

// set default route
Routes.init( 'home' );
