"use strict";

var path = require('path');
var mm = require('../mod-meta.js');

var metas = [
    {
        path: 'mod.mod',
        //path: 'DAYLiGHT - Rainbow Six. Lockdown +2 trn.mod',
        title: 'intro number 62',
        length: '0min 51sec'
    },
    {
        path: 'it.it',
        //path: 'VACE - The Chosen Well of Souls +12 trn_3.it',
        title: 'fUCk Off thE BuS ...',
        length: '1min 1sec'
    },
    {
        path: 'xm.xm',
        //path: 'CUBiC - Strike Fighters Project 1 installer.xm',
        title: 'barbapapa equalizer',
        length: '0min 20sec'
    },
    {
        path: 's3m.s3m',
        //path: 'AT4RE - Desktop Icon Toy 2.8 crk.s3m',
        title: 'nassam',
        length: '0min 36sec'
    }
];

var i;

console.log('Testing getModMetaSync');
for (i = 0; i < metas.length; i++) {
    console.log('Check ' + metas[i].path + ' :');
    var mdata = mm.getModMetaSync(path.join('tests', 'mods', metas[i].path));
    console.log('Checking title: ' + (mdata.title === metas[i].title ? 'OK' : 'FAIL'));
    console.log(mdata);
    console.log('');
}
console.log('--------------------------');

console.log('Testing getModMeta (Async method)');
for (i = 0; i < metas.length; i++) {
    mm.getModMeta(path.join('tests', 'mods', metas[i].path), function (error, mdata) {
        if (!error) {
            console.log(mdata);
        } else {
            console.log(error);
        }
        console.log('');
    });
}
