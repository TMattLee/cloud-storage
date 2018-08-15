const { promisify } = require( 'util' );
const fs = require( 'fs' );
const readFileAsync = promisify( fs.readFile )

const User = require( '../../models/user' )
const Folder = require( '../../models/folder.js' )
const File = require( '../../models/file.js' )

const welcomeCatDir = process.cwd() + '/tmp/uploads/' + 'Welcome Cat.png'

const createNewUser = async( username ) => {
	
	let user = await User.findOne( { 'local.username': username } )
	console.log(user)
	if( user ){
		throw ({
			type: 'USER_ALREADY_EXITS_ERROR',
			message:	'This username is already taken'
		})
	}
	
	user = await new User({
		local:{
      username: username,
      email:    'noemail@noemail.noemail'
    },
	})
	
	const mainFolder = await new Folder({
		name:						'main',
		ownerId:				user._id,
		parentFolderId: null,
		level:					0,
	})
	
	user.mainFolder = mainFolder
	
	const fileData = await readFileAsync( welcomeCatDir )
	
	const catImageFile = await new File({
		name:									'Welcome Cat',
		ownerId:							user._id,
		sizeInKB:							33790 * 1024,
		mimeType:							'image/png',
		binaryData:						fileData,
		parentFolderId: 			mainFolder._id
	})
	
	await user.save()
	await mainFolder.save()
	await catImageFile.save()
	
}

module.exports = createNewUser