const allowedTypeObject = {
	
	'image/jpeg': 			true,
	'image/gif':				true,
	'image/png':				true,
	'image/bmp':				true,
	'application/pdf':	true,
	'video/mp4':				true,
	
}

const _isMimeTypeAllowed = ( mimeType ) => {
	return allowedTypeObject[ mimeType ]
}

module.exports = _isMimeTypeAllowed