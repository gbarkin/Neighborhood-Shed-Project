'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const multer  =  require('multer');
const path = require('path');
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 10000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

//end of test code


const {
  router: usersRouter
} = require('./users');
const {
  router: authRouter,
  localStrategy,
  jwtStrategy
} = require('./auth');
const {
  router: itemRouter
} = require('./items');

mongoose.Promise = global.Promise;

const {
  PORT,
  DATABASE_URL
} = require('./config');

const app = express();


// Logging
app.use(morgan('common'));

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

//use for ..
app.use(bodyParser.urlencoded({
  extended: true
}));

const jwtAuth = passport.authenticate('jwt', {
  session: false,
  
});



app.use(jsonParser, express.static('public'))



//code for uploading an image


app.post('/upload', (req, res) => {
  // let fileName = req.file.filename
  upload(req, res, (err) => {
    if(err){
      res.json("error");
    } else {
      if(req.file == undefined){
        res.json("error");
      } else {
        
        res.send(req.file.filename);
      }
    }
  });
});

//this is a test for uploading files

app.use('/api/users/', usersRouter);
app.use('/api/users/allusers', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/items/', itemRouter);
app.use('/api/items/add', itemRouter);
app.use('/api/items/deleteitem', itemRouter);





app.use('*', (req, res) => {
  return res.status(404).json({
    message: 'Not Found'
  });
});




let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {
  app,
  runServer,
  closeServer
};