const readChunk = require('read-chunk')
const fileType = require('file-type')

const getFileMimeTypeAndExtension = async( filename ) => {
  
  const fileLocationString = process.cwd() + '/tmp/uploads/' + filename
  //console.log('mime ',fileLocationString)
  try{
    const buffer = await readChunk(fileLocationString, 0, 255)
    
    return await fileType( buffer )
  }
  catch( error ){
    throw error
  }
  
}

module.exports = getFileMimeTypeAndExtension;