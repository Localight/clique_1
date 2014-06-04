'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

/**
 * Persona Schema
 */

var PersonaSchema = newSchema({

    mobileNumber: Number,
    name: String, // At what point in user's path do we obtain address? basic info? as mentioned in google doc
    cardsGiven: [{
      card: Number // is card a number or string? is this proper way to instantiate an array?
    }],
    cardsReceived: [{
      card: Number // is this proper way to instantiate an array?
    }],
    account: {
      amount: Number, // need money math module
      transactions: [{
        timestamp: {
          type: Date,
          default: Date.now
        },
        spent: Number
      }]
    }

});

mongoose.model('Persona', PersonaSchema);

// module.exports = mongoose.model('Persona', PersonaSchema);