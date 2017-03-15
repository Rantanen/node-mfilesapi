# MFilesAPI for Node.js
### MFilesAPI COM wrapper for Node.js

## Installation

```
npm install mfilesapi
```

**Uses on M-Files API. Only compatible with Windows**

Install failed ? Check the troubleshooting section below.

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

## Troubleshooting

Errors may occur when installing this package, due to the fact that it requires to compile C++ for Node on Windows.

These commands have to be executed in an administrator PowerShell.

### Can't find Python executable "python"

```
npm install -g --production windows-build-tools
```

### Failed to locate "CL.exe"

- Install Visual Studio Community (any version)
- Create a new C++ project and install the required dependency, it includes `CL.exe`

Do not forget to set your VS version as a Node variable :

```
npm config set msvs_version 2015
```

Full list of VS versions available [here](https://github.com/nodejs/node/blob/master/tools/gyp/pylib/gyp/MSVSVersion.py#L229)
