const extensions = {
	
	'jpg':				'image',
	'jpeg':				'image',
	'png':				'image',
	
	'pdf':				'document',

	'mp3':				'audio',
	'm4a':				'audio',
	
	'webm':				'video',
	'mp4':				'video',
	
}

const getFileTypeByExtension = ( ext ) => {
	return extensions[ext]
}

module.exports = getFileTypeByExtension;