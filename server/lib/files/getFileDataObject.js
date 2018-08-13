const { promisify } = require( 'util' );
const fs = require( 'fs' )
const readFileAsync = promisify( fs.readFile )

const getFileMimeType = require('./getFileMimeType')
const base64Encode = require('./base64Encode')

const getFileDataObject = async(fileLocationString) => {
	try{
		const mime = await getFileMimeType(fileLocationString)
		//const base64EncodedData = await base64Encode(fileLocationString)
		const binaryData = await readFileAsync(fileLocationString)
		
		return {
			name:								"tempname",
			mime:								mime,
			sizeInKB:						32000,
			//base64EncodedData:	base64EncodedData
			binaryData:					binaryData
		}
	}
	catch( error ){
		throw error
	}
}

module.exports = getFileDataObject