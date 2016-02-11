"use strict";

var fs = require('fs');
var path = require('path');

var METADATA = [
    {
        xm: {
            title: {
                offset: 17,
                length: 20
            }
        }
    },
    {
        mod: {
            title: {
                offset: 0,
                length: 20
            }
        }
    },
    {
        it: {
            title: {
                offset: 4,
                length: 20
            }
        }
    },
    {
        s3m: {
            title: {
                offset: 0,
                length: 28
            }
        }
    }
];

function readString(buffer, offset, length) {
    var str = '';
    if (length) {
        for (var i = 0; i < length; i++) {
            str += String.fromCharCode(buffer[offset + i]);
        }
    } else {
        while (buffer[offset]) {
            str += String.fromCharCode(buffer[offset++]);
        }
    }
    return str;
}

function collectMetadata(filePath, buffer) {
    var md = {};
    var md_config = (function () {
        var ext_name = path.extname(filePath).replace('.', '');
        if (ext_name) {
            for (var i = 0; i < METADATA.length; i++) {
                if (METADATA[i][ext_name]) {
                    return METADATA[i][ext_name];
                }
            }
        }
        return null;
    })();

    if (md_config) {
        // remove \u0000 from title
        md.title = readString(buffer, md_config.title.offset, md_config.title.length).trim().replace(/\0/g, '');
        return md;
    }
    return null;
}


module.exports = {
    getModMeta: function (filePath, callback) {
        fs.readFile(filePath, function (err, data) {
            if (err) throw err;
            var mdata = collectMetadata(filePath, data);
            var error = mdata !== null ? null : 'Looks like not supported mod format';

            callback(error, mdata);
        })
    },

    getModMetaSync: function (filePath) {
        var buffer = fs.readFileSync(filePath);
        return collectMetadata(filePath, buffer);
    }
};
