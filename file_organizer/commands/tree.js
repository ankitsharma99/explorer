function treeHelper(dirPath, indent) {
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile) {
        let fileName = path.basename(dirPath);
        console.log(indent+ " ├─── "+ fileName);
    }else {
        let dirName = path.basename(dirPath);
        console.log(indent + " └─── " + dirName);
        let children = fs.readdirSync(dirPath);
        for(let i = 0; i<children.length; i++) {
            let childPath = path.join(dirPath, children[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

function treeFn(dirPath) {
    // let destPath;
    if(dirPath === undefined) {
        treeHelper(process.cwd(), " ");
        return;
    }else {
        let doesExist = fs.existsSync(dirPath);
        if(doesExist) {
            treeHelper(dirPath, '');
        } else {
            console.log(`Please enter the correct path, you entered ${dirPath}`);
            return;
        }
    }
}

module.exports = {
    treeKey: treeFn
}