//const multer = require('multer')

const getFileDataObject = async(file) => {
	return {
		name:		"tempname",
		mime:			'test/notreal',
		sizeInKB: 32000,
		binaryData: 'dfDFDFDFDFDDDF++DFDF+D+D+DFD+F+'
	}
}

module.exports = getFileDataObject