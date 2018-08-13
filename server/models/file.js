const mongoose      = require('mongoose'),
	Schema        = mongoose.Schema;

const fileSchema = new Schema({
	name:				String,
	data:				String,
	mimeType:		String,
	sizeInKB:		Number,
	//base64EncodedData: String,
	binaryData:	Buffer,
	ownerId: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	parentFolderId: {
		type: Schema.Types.ObjectId,
		ref: "Folder"
	},
	kind: {
		type: String,
		default: 'File'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model("File", fileSchema);