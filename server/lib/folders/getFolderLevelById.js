const Folder = require('../../models/folder.js')

const getFolderById = require('./getFolderById.js')

const getFolderLevelById = async (folderId) => {
	
	try{
		let folder = await getFolderById(folderId)
		
		if( folder ) {
			return folder.level;
		}
		
	}
	catch(error){
		console.log(error)
	}
	return null
}

module.exports = getFolderLevelById;