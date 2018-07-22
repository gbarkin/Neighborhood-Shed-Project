'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {Item} = require('./models');
const {User} = require('../users/models');

const router = express.Router();
const jsonParser = bodyParser.json();

const {jwtStrategy} = require('../auth');
const jwtAuth = passport.authenticate('jwt', { session: false });

var multer = require("multer");
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public'); // set the destination
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + '.jpg'); // set the file name and extension
    }
});
var upload = multer({storage: storage});

//get the users in app

router.get('/allusers',jsonParser, (req, res)=>{
    User.find({},{username: 1, firstName: 1,email: 1,lastName:1,_id:0})
    .then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error: 'something went wrong'});
    });
    
  });
  



//check if logged in

router.get('/loggedin',jsonParser, jwtAuth, (req, res)=>{
    Item.find()
    .then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error: 'something went wrong'});
    });
    
});

//get all the items

router.get('/',jsonParser,jwtAuth, (req, res)=>{
    Item.find()
    .then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error: 'something went wrong'});
    });
    
});

//search for item

router.get('/search',jsonParser, jwtAuth, (req, res)=>{
   console.log(req.query.item);
    Item.find().where('itemName').equals(req.query.item)
    .then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error: 'something went wrong'});
    });
    
});


//gets items that belong to user

router.get('/useritems',jsonParser, jwtAuth, (req, res)=>{
    const userName = req.user.username;
    
    Item.find({
        username: userName
    })
    .then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error: 'something went wrong'});
    });
    
});

//gets items rented to user

router.get('/userrenteditems',jsonParser, jwtAuth, (req, res)=>{
    const userName = req.user.username;
    Item.find({
        loanedTo: userName
    })
    .then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error: 'something went wrong'});
    });
    
});


//add items

router.post('/add', jsonParser, jwtAuth, (req, res)=>{

    const requiredFields = ['itemName', 'fee'];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
      if (!req.body.itemName){
          console.error(message);
          return res.status(400).send(message);
      }
    }


const noImage = "images/no_image.png";
const imageData = [req.body.image];
if (imageData == "uploads/error"){
    req.body.image = noImage;
}

const userName = req.user.username;


User.find({username: userName},{email: 1,_id:0})


.then(function (result){
   let userResult = result[0].email
   console.log(userResult);
Item.create({
    itemName: req.body.itemName,
    fee: req.body.fee,
    username: userName,
    email: userResult,
    description: req.body.description,
    image: req.body.image,
    status: 'in',
    loanedTo: 'none'

})
.then(result=>res.status(200).json(result))
.catch(err =>{
    console.error(err);
    res.status(500).json({error: 'wrong wrong'});
});
})
})

//delete an item

router.delete('/deleteitem', jsonParser, (req, res) => {
    const itemId = req.body._id;
    Item
      .findByIdAndRemove(itemId)
      .then(() => {
        res.json({ message: 'success' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'something went wrong' });
      });
  });

  //update item

  router.put('/loanitem', jsonParser, (req, res) => {
    const itemId = req.body._id;
    const loanUser = req.body.loanedTo;
    const loanStatus = req.body.status;
    console.log(loanUser)
    Item
      .findByIdAndUpdate({_id:itemId},{loanedTo: loanUser, status: loanStatus})
      .then(() => {
        res.json({ message: 'success' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'something went wrong' });
      });
  });


//return items

  router.put('/returnitem', jsonParser, (req, res) => {
    const itemId = req.body._id;
    const loanUser = req.body.loanedTo;
    const loanStatus = req.body.status;
    console.log(loanUser)
    Item
      .findByIdAndUpdate({_id:itemId},{loanedTo: loanUser, status: loanStatus})
      .then(() => {
        res.json({ message: 'success' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'something went wrong' });
      });
  });


module.exports = {router};


