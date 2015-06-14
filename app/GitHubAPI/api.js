var $ = require('jquery');
$.cookie = require('js-cookie');

var request = require('superagent');
var url_base = 'https://api.github.com';

var Q = require('q');

function _UrlBuilder( fragment ) {
    var _url = [];
    _url.push( url_base );

    _url = _url.concat( [].slice.call(arguments) ); 

    return _url.join('/');
}

var GitHubAPI = {};

GitHubAPI.getRepos = function() {
    var d = Q.defer();

    var APIRoute = [ 'user/repos' ];

    request
        .get( _UrlBuilder( APIRoute ) )
        .query({
            access_token: $.cookie('token')
            , type: 'owner'
        })
        .end(function(err,res) {
            if ( err ) {
                d.reject( err );
            }
            else {
                d.resolve( res );
            }
        });

    return d.promise;
}

GitHubAPI.getRepo = function( user, repo ) {
    var d = Q.defer();

    var APIRoute = [
        'repos'
        , user
        , repo
        , 'git'
        , 'refs'
        , 'heads'
        , 'master'
    ];

    request
        .get( _UrlBuilder.apply( null, APIRoute ) )
        .query({
            access_token: $.cookie('token')
        })
        .end(function(err,res) {
            if ( err ) {
                d.reject( err );
            }
            else {
                d.resolve( res );
            }
        });

    return d.promise;
}

GitHubAPI.getFiles = function( user, repo, sha ) {
    var d = Q.defer();

    var APIRoute = [
        'repos'
        , user
        , repo
        , 'git'
        , 'trees'
        , sha
    ];

    request
        .get( _UrlBuilder.apply( null, APIRoute ) )
        .query({
            access_token: $.cookie('token')
            , recursive: 1
        })
        .end(function(err,res) {
            if ( err ) {
                d.reject( err );
            }
            else {
                d.resolve( res );
            }
        });

    return d.promise;
}

GitHubAPI.getFile = function( user, repo, path ) {
    var d = Q.defer();

    var APIRoute = [
        'repos'
        , user
        , repo
        , 'contents'
    ];

    APIRoute = APIRoute.concat( path.split('/') );

    request
        .get( _UrlBuilder.apply( null, APIRoute ) )
        .query({
            access_token: $.cookie('token')
        })
        .end(function(err,res) {
            if ( err ) {
                d.reject( err );
            }
            else {
                d.resolve( res );
            }
        });

    return d.promise;
}

module.exports = GitHubAPI;

