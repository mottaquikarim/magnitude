var $ = require('jquery');
var _ = require('underscore');
var AceEditor = require('../AceEditor')();

$.cookie = require('js-cookie');

var GitHubAPI = require('../GitHubAPI/api');

var TEMPLATE_ID = 'edit';

var _editList = $('#edit');

var container = $('.main');
var compiled_editList = _.template( _editList.html() );

function _parseHashForParams( hash ) {
    if ( typeof hash === "undefined" ) return null;

    var bits = hash.split('?');
    if ( bits.length === 0 || bits.length === 1 ) {
        return null;
    }

    var search = bits[ 1 ];
    var params = {};
    search.split('&').map(function(el) {
        var elBits = el.split('=');
        params[ elBits[ 0 ] ] = elBits[ 1 ];
    });

    return params;
};

function _template( user, repo ) {
    var params = _parseHashForParams( window.location.hash );
    GitHubAPI.getFile( user, repo, params.path )
        .then( _populateEditList( user, repo ) );
}

function _populateEditList( user,repo ) {
    return function(data) {
        console.log( data );
        data.__user = user;
        data.__repo = repo;
        container.html( compiled_editList( data ) );
        AceEditor.create( data.body.name );
    }
}

function bootstrap( user, repo ) {
    _template( user, repo );
}

module.exports = bootstrap; 
