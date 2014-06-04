'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

/**
 * Card Schema
 */

var CardSchema = new Schema({

    districtNumber: Number, // phone number on card. Do we have to parse out the numbers from input?
    status: {         
      type: String,         // ‘new | touched | activated | received’
      default: 'new'
    } 
    amount: Number,
    kickbackAmount: Number // or is this going to be a percentage?

});

mongoose.model('Card', CardSchema);

// module.exports = mongoose.model('Card', CardSchema);