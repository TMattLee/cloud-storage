const getAndPopulateUserByUsername = require('../lib/users/getAndPopulateUserByUsername')

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
      const user = await getAndPopulateUserByUsername(username)
      
      const data = user
      res.locals.data = data
      //console.log(data)
      res.send(data)
    }
    catch( error ){
      console.log( error)
    }
  }
  
  
  ,postData: (req,res) => {
    
  }
  
}