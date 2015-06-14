var $ = require('jquery');
var _ = require('underscore');

$.cookie = require('js-cookie');

var GitHubAPI = require('../GitHubAPI/api');

var TEMPLATE_ID = 'repo';

var _repoList = $('#repo');

var container = $('.main');
var compiled_repoList = _.template( _repoList.html() );

function _template( user, repo ) {

    GitHubAPI.getRepo( user, repo )
        .then(function(data) {
            var sha = data.body.object.sha;
            return GitHubAPI.getFiles( user, repo, sha );
        }).then( _populateRepoList(user,repo) );
}

function _populateRepoList( user,repo ) {
    return function(data) {
        console.log( data );
        // TOD: another way! THis is dangerous
        data.__user = user;
        data.__repo = repo;
        container.html( compiled_repoList( data ) );
    }
}

function bootstrap( user, repo ) {
    _template( user, repo );
}
module.exports = bootstrap; 
