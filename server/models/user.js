const mongoose  = require('mongoose'),
	Schema        = mongoose.Schema
	
const UserSchema = new Schema({
// local auth details
	local:  {
		username: 	String,
		email:			String,
		salt:       String,
		hash:       String,
	},
	
	mainFolder:{
		type: Schema.Types.ObjectId,
		ref: "Folder"
	},
	
	dataSize: Number,
})

module.exports = mongoose.model("User", UserSchema);