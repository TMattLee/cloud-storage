const mongoose      = require('mongoose'),
	Schema        = mongoose.Schema;

const FolderSchema = new Schema({
		name: String,
		ownerId: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		level:{
			type: Number,
		},
		parentFolderId: {
			type: Schema.Types.ObjectId,
			ref: "Folder"
		},
		kind: {
			type: String,
			default: 'Folder'
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	},
	
	{ toJSON: { virtuals: true } 

})

FolderSchema.virtual('contents', {
	ref: ['File','Folder'] , // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'parentFolderId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  //options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
})



module.exports = mongoose.model("Folder", FolderSchema);