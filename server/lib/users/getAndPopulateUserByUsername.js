const User = require('../../models/user')

const getUserByUsername = async( username ) => {
	return User.findOne({'local.username':username}).populate({
		path: 'mainFolder',
		select:'-binaryData',
		populate:{
			path: 'contents',
			select:'-binaryData',
			populate:{
				path: 'contents',
				select:'-binaryData',
				populate:{
					path: 'contents',
					select:'-binaryData',
					populate:{
					  path: 'contents',
					  select:'-binaryData',
					  populate:{
						  path: 'contents',
						  select:'-binaryData',
						}
					}
				}
			}
		}
	}) 

}

module.exports = getUserByUsername