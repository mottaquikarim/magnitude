var $ = require('jquery');
$.cookie = require('js-cookie');
var configs = require('./config');
var Mediator = require('../Mediator');

var TOKENSERVER = 'http://localhost:3000/code/';

function _isAccessTokenSet() {
    return !!window.location.search;
}

function locationSearchToArray( res ) {
    res = res.slice(1);
    res = res.split('&');

    return res.map(function(el) {
        return el.split('=')[1];
    });
}

var OAuthClient = {};
OAuthClient.accessToken = false;

OAuthClient.openWin = function openWin() {
    window.open( configs.getURL() );
}

OAuthClient.sendBackData = function sendBackData() {
    var code = window.location.search;

    window.opener.postMessage(code, window.location);
    window.close();
}

OAuthClient.getAccessToken = function getAccessToken() {
    if ( this.accessToken ) {
        return;
    }

    window.addEventListener('message', onMessage.bind(this));

    function onMessage( event ) {
        var code = locationSearchToArray( event.data );
        var APIurl = TOKENSERVER + code[ 0 ];

        $.get( APIurl )
        .then(function( data ) {
            this.accessToken = data;
            $.cookie( 'token', this.accessToken, '/' );

            Mediator.send( 'access_token_set', 'token' ) 
        }.bind(this));
    }
}

OAuthClient.handleAuthentication = function handleAuthentication( $el ) {
    if ( typeof $el === "undefined" || $el.length === 0 ) {
        return;
    }

    if ( _isAccessTokenSet() ) {
        this.sendBackData();
    }
    else {
        $el.on('click', this.openWin);
    }
}

module.exports = function() {
    OAuthClient.getAccessToken();

    return OAuthClient;
}
