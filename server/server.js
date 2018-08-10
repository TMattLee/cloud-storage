'use strict';
require('dotenv').config()
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const axios = require('axios')
//const passport = require( './lib/passport/index.js' );

const app = express();
const port = process.env.PORT || 3001;

/*------------------------------------------------------------------------------
---------------------------- Mongoose and Schemas ------------------------------
------------------------------------------------------------------------------*/

mongoose.connect( process.env.MONGOLAB_URI );
mongoose.Promise = global.Promise;


const User = require('./models/user.js')
const Folder = require('./models/folder.js')
const populateDummyData = require('./dummyData.js');
const getFolderLevelById = require('./lib/folders/getFolderLevelById.js')
User.findOne({})
  .populate({
    path: 'mainFolder',
    populate:{
      path: 'contents',
      populate:{
        path: 'contents',
        populate:{
          path: 'contents',
          populate:{
            path: 'contents',
           
          }
        }
      }
    }
  })
  .exec( ( error, docs ) => {
    if(error) console.log(error);
    if (!docs || docs.length < 1) {
      populateDummyData();
    }
    else{
      Folder.findOne({_id:"5b6b30f2b90a767e406064d8"}).exec((error, folder) => {
        if(folder) getFolderLevelById(folder._id)
        .then( level => console.log("Level of folder is: ",level))
        .catch( error => console.log)
      })
      
      //console.log(JSON.stringify(docs, null, 4))
    }
  })

//----------------------- Page Rendering ------------------------------
app.set( "view engine", "ejs" );
//app.set( 'trust proxy', 1 );

//----------------------- Express Options ----------------------------
app.set('images', process.cwd() + '/public/user/images');
app.use( express.static( process.cwd() + '/public' ) );
app.use( bodyParser.json() ); // support json encoded bodies
app.use( bodyParser.urlencoded( { extended: false } ) ); // support encoded bodies
app.use(
  session({ 
    jwt:        null,
    secret:     process.env.SESSION_SECRET,
    cookie: { 
      maxAge:     1000*10*60,
      httpOnly:   true,
      secure:     false,
      path:       '/',
    },
    resave:     true, 
    rolling:    true,
  })
);

//app.use( passport.initialize() );
//app.use( passport.session() );


//-------------------------Message Flashing-------------------------------------
//const flash = require( 'connect-flash' );
//app.use( flash() );

// ----------------------------- Routes ----------------------------------------

const routes = require( './routes/index.js' );

/*app.locals.moment = require('moment');

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});*/

app.use( '/', routes );

app.listen(port, function(){
  console.log("Listening on port ", port)
});

module.exports = {
  app:      app,
  express:  express,
  //passport: passport,
}