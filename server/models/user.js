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
	
	storageUsedInBytes: {
		type: Number,
		default: 0 
	},
	
	maxStorageSizeInBytes: {
		type: Number,
		default: 16 * 1024 * 1024 //  16MB
	},
	
})

module.exports = mongoose.model("User", UserSchema);