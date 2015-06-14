module.exports = {
    client_id: '[YOUR_CLIENT_ID_HERE]'
    , redirect_uri: '[YOUR_LOCAL_HOST]/magnitude/index.html'
    , url_base: 'https://github.com/login/oauth/authorize'
    , access_token: 'https://github.com/login/oauth/access_token'
    , scope: 'repo'
    , getURL: function() {
        var base = this.url_base + '?';
        var args = [
            'client_id='+this.client_id
            , 'redirect_uri='+this.redirect_uri
            , 'scope='+this.scope
            , 'state=hellowrold'
        ];

        return base + args.join('&');
    }
}
