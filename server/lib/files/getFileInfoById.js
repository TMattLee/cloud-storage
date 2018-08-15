const File = require('../../models/file')

const getFileInfoById = async( fileId ) => {
	try {
		
		const file = await File.findById(fileId).select('-binaryData')
		return file
		
	}
	catch(error){
		throw error
	}
}

module.exports = getFileInfoById;