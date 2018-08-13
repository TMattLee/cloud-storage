const readChunk = require('read-chunk')
const fileType = require('file-type')

const getFileMimeType = async( fileLocationString ) => {
  
  try{
    const buffer = await readChunk(fileLocationString, 0, 255)
    
    const { mime } = fileType( buffer )
    
    return mime
  }
  catch( error ){
    throw error
  }
  
}

module.exports = getFileMimeType;