
var cominterop = require( 'cominterop' );
var Registry = require( 'winreg' );

module.exports.load = function( cb ) {

    return new Promise( function( resolve, reject ) {

        var onError = function( msg ) {
            var error = new Error( msg );
            if( cb ) return cb( error );
            reject( error );
        };

        var key = new Registry({
            hive: Registry.HKLM,
            key: '\\Software\\Motive\\M-Files'
        });

        key.keys( function ( err, items ) {
            if( err )
                return onError( 'Couldn\'t open M-Files registry key. ' +
                                 'Ensure M-Files is installed.' );

            var keys = items
                .map( function( i ) { return i.key; } )
                .filter( function( key ) {
                    return /\\\d+\.\d+\.\d+\.\d+$/.exec( key )
                } )
                .sort()
                .reverse();

            if( keys.length === 0 )
                return onError( 'Couldn\'t find installed M-Files versions.' );

            var latest = keys[ 0 ];

            var latestKey = new Registry({
                hive: Registry.HKLM,
                key: latest
            });

            latestKey.get( 'InstallDir', function( err, installDir ) {
                if( err )
                    return onError(
                        'Couldn\'t read M-Files installation directory from registry.' );

                var lib = cominterop.load(
                    installDir.value + 'Common\\MFilesAPI.dll' );

                if( cb )
                    cb( null, lib );
                resolve( lib );
            } );
        } );
    } );
};
