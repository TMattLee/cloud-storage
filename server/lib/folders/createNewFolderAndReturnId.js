const Folder = require('../../models/folder.js')
const getFolderLevelById = require('./getFolderLevelById');

const createNewFolderAndReturnId = async( name, ownerId, parentFolderId ) => {
	
	try{
		let parentLevel = await getFolderLevelById(parentFolderId)

	  const folder = await new Folder({
	    name: 		name,
	    ownerId:	ownerId,
	    parentFolderId:	parentFolderId,
	    level:		parentLevel === null ? 0 : parentLevel + 1 ,
	  })
	  
	  await folder.save()
	  
	  return folder._id
	}
	catch (error){
		console.log(error )
	}
	
	return null
}

module.exports = createNewFolderAndReturnId;