const { promisify } = require( 'util' );
const fs = require( 'fs' );

const readFileAsync = promisify( fs.readFile )
const getFileStatsAsync = promisify( fs.stat )

const base64Encode = async( fileLocationString ) => {
    
    try{
        const file = await readFileAsync( fileLocationString )
        
        const fileStats = await getFileStatsAsync( fileLocationString )
        
        //console.log('file size: ', fileStats.size)
        
        return new Buffer( file ).toString( 'base64')
    }
    catch(error){
        throw error
    }

}

module.exports = base64Encode;