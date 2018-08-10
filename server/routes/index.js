const express = require( 'express' );
const router = express.Router();

const homeController = require( '../controllers/home.controller.js' );

router.route( '/getData' ).get( homeController.getData );
router.route( '/postData' ).post( homeController.postData );

module.exports = router;