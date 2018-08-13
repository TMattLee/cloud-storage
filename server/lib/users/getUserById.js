const User = require( '../../models/user' )

const getUserById = async( userId ) => {
	console.log( 'a ',userId)
	try{
		const user = await User.findOne( { _id:userId } )
		return user
	}
	catch( error ){
		throw error
	}
}

module.exports = getUserById