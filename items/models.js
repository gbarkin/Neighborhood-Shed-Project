'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ItemSchema = mongoose.Schema({
    itemName: {
      type: String,
      required: true,
    },
    fee: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    },
    username: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: false
      },
    status: {
      type: String,
      required: true
    },
    loanedTo: {
      type: String,
      required: true
    }



  });
  
  ItemSchema.methods.serialize = function() {
    return {
      itemName: this.itemName || ''
    };
  };
  
  
  const Item = mongoose.model('Item', ItemSchema);
  
  module.exports = {Item};
  