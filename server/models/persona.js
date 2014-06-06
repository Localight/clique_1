'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Persona Schema
 */

var PersonaSchema = new Schema({

    contact: {
      mobileNumber: Number,
      email: {
        type: String,
        match: [/.+\@.+\..+/, 'Please enter a valid email']
      }
    },
    basicProfile: {
      firstName: String
    },
    status: String, // Recipient/Patron/Clerk/Dormant(old user, no response)/Zombie(never clicked anything)
    cardsGiven: [{
      card: Number // is card a number or string? is this proper way to instantiate an array?
    }],
    cardsReceived: [{
      card: Number // is this proper way to instantiate an array?
    }],
    account: {
      ledger: Number, // linked to Subledger API - credits/refunds
      amount: Number, // need money math module
      transactions: [{
        amountSpent: Number,
        timestamp: {
          type: Date,
          default: Date.now
        },
      }]
    }

});

mongoose.model('persona', PersonaSchema);

// module.exports = mongoose.model('Persona', PersonaSchema);