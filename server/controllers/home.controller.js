const getAndPopulateUserByUsername = require('../lib/users/getAndPopulateUserByUsername')
const getFileInfoById = require('../lib/files/getFileInfoById')
const getFolderById = require('../lib/folders/getFolderById')

module.exports = {
  home: ( req, res ) => {
    res.render('index', { 
      page: 'index', 
      message: req.flash( 'notification' ),
    });
  },

  getUser: async(req,res) => {
    try{
      const {username} = req.query
      const user = await getAndPopulateUserByUsername(username)
      
      const data = user
      res.locals.data = data
      //console.log(data)
      res.send(data)
    }
    catch( error ){
      console.log( error)
    }
  },
  
  
  postUser: async( req,res ) => {
    
  },
  
  getItemInfo: async( req, res ) => { 
    try{  
      
      const { id, kind } = req.query
      const data  = kind === "File" ? await getFileInfoById( id ) : await getFolderById( id ) 
      res.send( data )
      
    }
    catch( error ){
      console.log( error)
    }
  },
  
  postItem: async( req,res ) => {
    
  },
  
  
  
}