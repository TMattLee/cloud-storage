const Folder = require('../../models/folder.js')

const getFolderById = async (folderId) => {
	
	try{
		let folder = await Folder.findById(folderId)
															
		return folder
	}
	catch( error ){
		console.log(error)
	}
}

module.exports = getFolderById;