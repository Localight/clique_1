'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Card Schema
 */

var CardSchema = new Schema({
    // _id: String,
    districtNumber: Number, // phone number on card. Do we have to parse out the numbers from input?
    keyword: String, // currently 'Gift'
    status: {         
      type: String,         // new | touched | activated | received
      default: 'new'
    }, 
    amount: Number,
    kickbackAmount: Number // percentage?

});

mongoose.model('card', CardSchema);

// module.exports = mongoose.model('Card', CardSchema);