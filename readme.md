Tracker mod metadata for .mod .xm .s3m .it

Currently returns only title.

Installation
------------

`$ npm install mod-meta`

Usage
-----

    var mm = require('mod-meta');

    // sync
    var mdata = mm.getModMetaSync('pathToMod');
    mdata !== null
        ? console.log('Mod title: ', mdata.title);
        : consile.log('Error');


    // async
    mm.getModMeta('pathToMod', function (error, mdata) {
        if (!error) console.log('Mod title: ', mdata.title);
    };


Tests
-----

`$ npm test`