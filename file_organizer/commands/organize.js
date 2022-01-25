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


function organizeFn(dirPath) {
    let destPath;
    if(dirPath === undefined) {
        destPath = process.cwd();
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


module.exports = {
    organizeKey: organizeFn
}