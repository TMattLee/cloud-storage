const User = require('../../models/user')

const getUserByUsername = async( username ) => {
	return (User.findOne({'local.username':username}).populate({
	    path: 'mainFolder',
	    populate:{
	      path: 'contents',
	      populate:{
	        path: 'contents',
	        populate:{
	          path: 'contents',
	          populate:{
	            path: 'contents',
	           
	          }
	        }
	      }
	    }
		}))
  
}

module.exports = getUserByUsername