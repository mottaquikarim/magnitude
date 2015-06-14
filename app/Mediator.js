module.exports = {
    modules: {}
    , register: function register( moduleName, module ) {
        var modules = this.modules;

        try {
            if ( typeof modules[ moduleName ] !== "undefined" ) {
                throw "Module Already Exists, Deregister first";
            }
        }
        catch( error ) {
            console.log( error );
            return;
        }

        // if we are here, add to object
        modules[ moduleName ] = module;
    } // register
    , registerMultiple: function registerMultiple( modulesHash ) {
        for ( var module in modulesHash ) {
            register( module, modulesHash[ module ] );
        }
    } // registerMultiple
    , deregister: function deregister( moduleName, module ) {
        var modules = this.modules;

        if ( typeof modules[ moduleName ] === "undefined" ) {
            return;
        }

        delete modules[ moduleName ];
    } // deregister
    , send: function send( message, data, to ) {
        var modules = this.modules;

        if ( typeof to !== "undefined" ) {
            modules[ to ].receive( message, data );
        }
        else {
            for ( var module in modules ) {
                var curr = modules[ module ];
                if (
                    typeof curr !== "undefined"
                    && typeof curr.receive !== "undefined"
                ) {
                    curr.receive( message, data );
                }
            } // for
        } // else
    } // send
};
 
