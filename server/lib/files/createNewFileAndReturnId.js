const fs = require('fs')
const { promisify } = require( 'util' );

const File = require('../../models/file.js')

const getFileDataObject = require('./getFileDataObject')
const getFileMimeTypeAndExtension = require('./getFileMimeTypeAndExtension')
const _isMimeTypeAllowed = require('./_isMimeTypeAllowed')
const getFileTypeByExtension = require('./getFileTypeByExtension')

const getUserById = require('../users/getUserById')

const getFileStatAsync = promisify( fs.stat )

const maxFileSizeInBytes = 1024 * 1024 * 2

const createNewFileAndReturnId = async( ownerId, parentFolderId, filename ) => {
	
	const fileLocationString = process.cwd() + '/tmp/uploads/' + filename

	try{
		const fileStats = await getFileStatAsync(  fileLocationString )
		
		if(fileStats.size > maxFileSizeInBytes ){ 
			throw {
				type: 'MAX_SIZE_EXCEEDED_ERROR',
				message: 'File exceeds the maximum allowable size.'
			}
		}
		
		const { mime, ext } = await getFileMimeTypeAndExtension( filename )
		
		if( _isMimeTypeAllowed( mime ) !== true ){
			throw {
				type: 'MIME_TYPE_NOT_ALLOWED_ERROR',
				message: 'File type is not allowed: ' + mime
			}
		}
		
		const user = await getUserById( ownerId )
		
		if(user.storageUsedInBytes + fileStats.size > user.maxStorageSizeInBytes) {
			throw {
				type: 'STORAGE_LIMI_EXCEEDED_ERROR',
				message: 'File exceeds user maximum storage.'
			}
		}
		
		const fileData = await getFileDataObject( filename )
		
		const file = await new File({
			name:						fileData.name,
			ownerId:				ownerId,
			sizeInKB:				Math.floor(fileStats.size / 1024),
			extension:			ext,
			mimeType:				mime,
			fileType:				getFileTypeByExtension( ext ),
			//base64EncodedData:		fileData.base64EncodedData,
			binaryData:			fileData.binaryData,
			parentFolderId: parentFolderId
		})
		
		await file.save()
		
		user.storageUsedInBytes += fileStats.size
		
		await user.save()
		
		return file._id
	}
	catch( error ){
		throw error
	}
	
}

module.exports = createNewFileAndReturnId