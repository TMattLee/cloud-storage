const { promisify } = require( 'util' );
const fs = require( 'fs' )
const readFileAsync = promisify( fs.readFile )

const getFileMimeTypeAndExtension = require('./getFileMimeTypeAndExtension')
const base64Encode = require('./base64Encode')

const getFileDataObject = async(filename) => {
	
	const fileLocationString = process.cwd() + '/tmp/uploads/' + filename
	  //console.log('filedata',fileLocationString)

	try{
		const { mime, extension } = await getFileMimeTypeAndExtension( filename )
		//const base64EncodedData = await base64Encode(fileLocationString)
		const binaryData = await readFileAsync( fileLocationString )

		return {
			name:								filename,
			//base64EncodedData:	base64EncodedData
			binaryData:					binaryData
		}
	}
	catch( error ){
		throw error
	}
}

module.exports = getFileDataObject