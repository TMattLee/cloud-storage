// dummy data to populate the app

const mongoose = require('mongoose');

const User = require('./models/user.js')

const Folder = require('./models/folder.js')

const File = require('./models/file.js')

const createNewFolderAndReturnId = require('./lib/folders/createNewFolderAndReturnId')
const createNewFileAndReturnId = require('./lib/files/createNewFileAndReturnId')
const createNewUser = require('./lib/users/createNewUser')
const getUserByUsername = require('./lib/users/getUserByUsername')

const imageFolder = process.cwd() + '/tmp/uploads/'

const populateDummyData = async () => {
  
  
  
  let user1, mainFolderId, folder1Id, folder2Id, folder3Id, folder4Id, folder5Id;
  let file1, file2, file3, file4, file5, file6
  
  try{
    const username = 'Dummy User'
    await createNewUser(username)
    
    const user1 = await getUserByUsername(username)
    
    folder1Id = await createNewFolderAndReturnId('First Level', user1._id, user1.mainFolder)
    folder2Id = await createNewFolderAndReturnId('Second Directory', user1._id, folder1Id._id)
    folder3Id = await createNewFolderAndReturnId('Third Level Directory', user1._id, folder2Id._id)
    folder4Id = await createNewFolderAndReturnId('Fourth Level Directory', user1._id, folder3Id._id)
    folder5Id = await createNewFolderAndReturnId('Fifth Level Directory', user1._id, folder4Id._id)
  
    file1 = await createNewFileAndReturnId(user1._id, user1.mainFolder, imageFolder + '62408_1.png')
    file2 = await createNewFileAndReturnId(user1._id, user1.mainFolder, imageFolder + 'cat.jpeg')
    file3 = await createNewFileAndReturnId(user1._id, folder1Id, imageFolder + 'cat.txt')
    file4 = await createNewFileAndReturnId(user1._id, folder1Id, imageFolder + '62408_1.png')
    file5 = await createNewFileAndReturnId(user1._id, folder3Id, imageFolder + 'cat.jpeg')
    file6 = await createNewFileAndReturnId(user1._id, folder4Id, imageFolder + 'cat.txt')
  
    await user1.save( error => console.log )
    
  }
  catch( error ){
    console.log(error)
  }
  
}

module.exports = populateDummyData;