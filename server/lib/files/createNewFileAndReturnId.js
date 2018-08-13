const fs = require('fs')
const { promisify } = require( 'util' );

const File = require('../../models/file.js')

const getFileDataObject = require('./getFileDataObject')
const getFileMimeType = require('./getFileMimeType')
const _isMimeTypeAllowed = require('./_isMimeTypeAllowed')

const getUserById = require('../users/getUserById')

const getFileStatAsync = promisify( fs.stat )

const maxFileSizeInBytes = 1024 * 1024 * 2

const createNewFileAndReturnId = async( ownerId, parentFolderId, fileLocationString ) => {
	
	try{
		const fileStats = await getFileStatAsync( fileLocationString )
		
		if(fileStats.size > maxFileSizeInBytes ){ 
			throw {
				type: 'MAX_SIZE_EXCEEDED_ERROR',
				message: 'File exceeds the maximum allowable size.'
			}
		}
		
		const mimeType = await getFileMimeType( fileLocationString )
		
		if( _isMimeTypeAllowed( mimeType ) !== true ){
			throw {
				type: 'MIME_TYPE_NOT_ALLOWED_ERROR',
				message: 'File type is not allowed: ' + mimeType
			}
		}
		
		const user = await getUserById( ownerId )
		
		console.log(user, ownerId)
		
		if(user.storageUsedInBytes + fileStats.size > user.maxStorageSizeInBytes) {
			throw {
				type: 'STORAGE_LIMI_EXCEEDED_ERROR',
				message: 'File exceeds user maximum storage.'
			}
		}
		
		const fileData = await getFileDataObject( fileLocationString )
		
		const file = await new File({
			name:						fileData.name,
			ownerId:				ownerId,
			size:						fileData.size,
			mimeType:				fileData.mime,
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
		console.log(error)
		return error
	}
	
	return null
}

module.exports = createNewFileAndReturnId