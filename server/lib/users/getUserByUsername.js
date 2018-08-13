const User = require( '../../models/user' )

const getUserByUsername = async( username ) => {
	
	const user = await User.findOne( { 'local.username': username } )
		
	return user
		
}

module.exports = getUserByUsername