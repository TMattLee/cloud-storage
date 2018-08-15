const express = require( 'express' );
const router = express.Router();

const homeController = require( '../controllers/home.controller.js' );

router.route( '/getUser' ).get( homeController.getUser );
router.route( '/postUser' ).post( homeController.postUser );

router.route( '/getItemInfo' ).get( homeController.getItemInfo );
router.route( '/postItem' ).post( homeController.postItem );

module.exports = router;