// dummy data to populate the app

const mongoose = require('mongoose');

const User = require('./models/user.js')

const Folder = require('./models/folder.js')

const File = require('./models/file.js')

const createNewFolderAndReturnId = require('./lib/folders/createNewFolderAndReturnId')
const createNewFileAndReturnId = require('./lib/files/createNewFileAndReturnId')



const populateDummyData = async () => {
  
  const user1 = new User({
    local:{
      username: 'Dummy User',
      email:    'noemail@noemail.noemail'
    },
  })
  
  let mainFolderId, folder1Id, folder2Id, folder3Id, folder4Id, folder5Id;
  
  try{
    mainFolderId = await createNewFolderAndReturnId('main', user1._id, null)
    folder1Id = await createNewFolderAndReturnId('First Level', user1._id, mainFolderId._id)
    folder2Id = await createNewFolderAndReturnId('Second Directory', user1._id, folder1Id._id)
    folder3Id = await createNewFolderAndReturnId('Third Level Directory', user1._id, folder2Id._id)
    folder4Id = await createNewFolderAndReturnId('Fourth Level Directory', user1._id, folder3Id._id)
    folder5Id = await createNewFolderAndReturnId('Fifth Level Directory', user1._id, folder4Id._id)
  }
  catch( error){
    console.log(error)
  }
  
  let file1, file2, file3, file4, file5, file6
  
  try{
    file1 = await createNewFileAndReturnId(user1._id, mainFolderId, null)
    file2 = await createNewFileAndReturnId(user1._id, mainFolderId, null)
    file3 = await createNewFileAndReturnId(user1._id, folder1Id, null)
    file4 = await createNewFileAndReturnId(user1._id, folder1Id, null)
    file5 = await createNewFileAndReturnId(user1._id, folder3Id, null)
    file6 = await createNewFileAndReturnId(user1._id, folder4Id, null)
  }
  catch( error){
    console.log(error)
  }
  
  
  try{
    //await file1.save()
    
    //await file2.save()
    
    //await file3.save()
  
    //await file4.save()
    
    //folder1.contents = [file3,file4]
    
    //await folder1.save( error => console.log )
    
    user1.mainFolder = mainFolderId;
    //user1.data = mainFolder
    
    await user1.save( error => console.log )
  }
  catch( error ){
    console.log(error)
  }
}

module.exports = populateDummyData;