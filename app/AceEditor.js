var $ = require('jquery');
var ace = require('brace');
require('brace/theme/github');
require('brace/mode/javascript');
require('brace/mode/css');
require('brace/mode/html');
require('brace/mode/markdown');
require('brace/mode/php');

var AceEditor = {}

AceEditor.computeType = function( name ) {
    var ext = name.split('.');

    if ( ext.length === 0 || ext.length === 1 ) {
        return 'text'; 
    }

    ext = ext[ 1 ];

    var hash = {
        'js': 'javascript'
        , 'css': 'css'
        , 'html': 'html'
        , 'md': 'markdown'
    };

    if ( typeof hash[ ext ] === "undefined" ) {
        return 'text';
    }

    return hash[ ext ];
}

AceEditor.create = function( name ) {

    var type = this.computeType( name );

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/github");
    editor.getSession().setMode("ace/mode/"+type);
}

module.exports = function() {
    return Object.create( AceEditor );
};
