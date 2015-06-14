var request = require('request');
var configs = require('../js/config');

var CLIENT_SECRET = '[YOUR_CLIENT_SECRET_HERE]';

module.exports = function( req, reply ) {
    var form = {
        client_id: configs.client_id
        , client_secret: CLIENT_SECRET
        , code: req.params.code
    };
    var opts = {
        form: form
    };
    request.post(
        configs.access_token
        , opts
        , function(err, res) {
              var data = res.body.split('&');
              var token = data[0].split('=')[1];
              reply( token );
        }
     );
}
