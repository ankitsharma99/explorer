let inputArr = process.argv.slice(2);
const fs = require('fs');
const path =  require('path');

let types = {
    videos: ['mp4', 'mkv'],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'htm', 'html', 'pptx'],
    app: ['exe', 'dmg', 'pkg', 'deb'],
    images: ['jpg', 'jpeg', 'png']
};

function getCategory(name) {
    let ext =   path.extname(name);
    ext = ext.slice(1);

    for(let type in types) {
        let currType = types[type]; 
        for(let i = 0; i<currType.length; i++) {
            if(ext === currType[i]) {
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcFile, dest, category) {
    let categoryPath = path.join(dest, category);
    if(!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFile);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFile, destFilePath);
    console.log(fileName, 'copied to ', category);
}

let command = inputArr[0];
switch(command) {
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log(`Please specify the correct path`);
        break;
}

function treeFn(dirPath) {
    
}
function organizeFn(dirPath) {
    let destPath;
    if(dirPath === undefined) {
        console.log(`Please enter the path, you entered ${dirPath}`);
        return;
    }else {
        let doesExist = fs.existsSync(dirPath);
        if(doesExist) {
            destPath = path.join(dirPath, 'organized_files');
            if(!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath);
            }
            
        } else {
            console.log(`Please enter the correct path, you entered ${dirPath}`);
            return;
        }
    }
    organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src);
    for(let i = 0; i<childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile) {
            let category = getCategory(childNames[i]);
            
            sendFiles(childAddress, dest, category); 
        }
    }
}

function helpFn() {
    console.log(`
        List of all commands:
            1. node main.js tree 'directoryPath'
            2. node main.js organize 'directoryPath'
            3. node main.js help
    `);
}

