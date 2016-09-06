# MFilesAPI for Node.js
### MFilesAPI COM wrapper for Node.js

## Installation

```
npm install mfilesapi
```

**Uses on M-Files API. Only compatible with Windows**

## Usage

```
require( 'mfilesapi' ).load( function( err, mfilesapi ) {

    var app = new mfilesapi.MFilesServerApplication();
    app.Connect();
    
    var vault = app.GetVaults()[ 0 ];
} );
```

## Caveats

- TypeLib loading is asynchronous.
- Collection indexes are zero-based. Use `get_Item()` for the raw one-based getter.

## Future plans

- Replace the async registry lookup with synchronous code. This would
  allow normal require().

