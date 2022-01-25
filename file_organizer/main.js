#!/usr/bin/env node
let inputArr = process.argv.slice(2);
const fs = require('fs');
const path =  require('path');
let helpObj = require('./commands/help');
let treeObj = require('./commands/tree');
let organizeObj = require('./commands/organize');

let types = {
    videos: ['mp4', 'mkv'],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'htm', 'html', 'pptx'],
    app: ['exe', 'dmg', 'pkg', 'deb'],
    images: ['jpg', 'jpeg', 'png']
};



let command = inputArr[0];
switch(command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log(`Please specify the correct path`);
        break;
}
