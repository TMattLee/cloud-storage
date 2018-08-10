const File = require('../../models/file.js')
//const getFileSize = require('./getFileSize')
const getFileDataObject = require('./getFileDataObject')


const createNewFileAndReturnId = async(ownerId, parentFolderId, file) => {
	try{
		const fileData = await getFileDataObject()
		
		const file = await new File({
			name:						fileData.name,
			ownerId:				ownerId,
			size:						fileData.size,
			mimeType:				fileData.mime,
			parentFolderId: parentFolderId
		})
		
		await file.save()
		
		return file._id
	}
	catch( error ){
		console.log(error)
	}
	
	return null
}

module.exports = createNewFileAndReturnId