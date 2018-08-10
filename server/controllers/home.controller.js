const getUserByUsername = require('../lib/users/getUserByUsername')

module.exports = {
  home: ( req, res ) => {
    res.render('index', { 
      page: 'index', 
      message: req.flash( 'notification' ),
    });
  }

  ,getData: async(req,res) => {
    try{
      const {username} = req.query
      const user = await getUserByUsername(username)
      res.send(user)
    }
    catch( error ){
      console.log( error)
    }
  }
  
  
  ,postData: (req,res) => {
    
  }
  
}