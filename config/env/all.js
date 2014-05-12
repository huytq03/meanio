var path = require('path'),
rootPath = path.normalize(__dirname + '/../..'),
assetsPath = __dirname + "/assets/",
placeholdersPath = assetsPath + "placeholders/",
uploadedFilesPath = assetsPath + "uploadedFiles/";

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL    
}
