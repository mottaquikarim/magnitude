var $ = require('jquery');
var _ = require('underscore');

$.cookie = require('js-cookie');

var GitHubOAuthCLI = require('../GitHubAPI/oauth.js')();
var GitHubAPI = require('../GitHubAPI/api');

var TEMPLATE_ID = 'home';
var Mediator = require('../Mediator');
Mediator.register(
    TEMPLATE_ID
    , { receive: _receive }
);

var _homeInit = $('#'+TEMPLATE_ID+'-init');
var _homeList = $('#'+TEMPLATE_ID+'-list');

var container = $('.main');
var compiled_homeInit = _.template( _homeInit.html() );
var compiled_homeList = _.template( _homeList.html() );


function _template( accessToken ) {
    var isAccessToken = typeof accessToken === "undefined";

    if ( isAccessToken ) {
        _populateInit();
        return;
    }

    GitHubAPI.getRepos()
        .then( _populateList )
        .fail( _onFail );
} 

function _populateList( res ) {
    console.log( res );
    container.html( compiled_homeList( res ) );
}

function _populateInit() {
    container.html( compiled_homeInit() );
}

function _onFail( err ) {
    console.log(err);
    if ( err ) {
        alert('Error!');
        _template();
        return;
    }
}

function _receive( message, data ) {
    if ( message === 'access_token_set' ) {
        _template( $.cookie(data) );
    }
}

function bootstrap() {
    if ( $.cookie( 'token' ) ) {
        _template( $.cookie('token') );
    }
    else {
        _template();
    }

    var $login = $('.login');
    GitHubOAuthCLI.handleAuthentication( $login );

}
module.exports = bootstrap; 
