const File = require('../../../models/file.js')

const getBase64DataFromId = async(imageId) => {
	
	const file = await File.findById(imageId).populate('binaryData')
	
	const base64Data = file.binaryData.toString('base64')
	
	return base64Data
	
}

module.exports = getBase64DataFromId