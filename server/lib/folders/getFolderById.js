const Folder = require('../../models/folder.js')

const getFolderById = async (folderId) => {
	
	try{
		let folder = await Folder.findById(folderId).populate('contents')
		//console.log(folder)
		return folder
	}
	catch( error ){
		throw error
	}
}

module.exports = getFolderById;