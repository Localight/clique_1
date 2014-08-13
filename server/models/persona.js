'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  uuid = require('node-uuid'),
  Schema = mongoose.Schema;

/**
 * Persona Schema
 */

var PersonaSchema = new Schema({

  districtNumber: String,
  bpId: String
  contact: {
    mobileNumber: String,
    email: {
      type: String,
      match: [/.+\@.+\..+/, 'Please enter a valid email']
    }
  },
  basicProfile: {
    firstName: String,
    // bpId: String
  },
  creditCards: [{
    creditCardNumber: Number, // is card a number or string? is this proper way to instantiate an array?
    expireMonth: Number,
    expireYear: Number
  }],
  status: String, // Recipient/Patron/Clerk/Dormant(old user, no response)/Zombie(never clicked anything)
  inactiveCards: [{    // holds all cards user has texted for, but not yet activated.
    districtNumber: String,
    keyword: String,
    uniqueLink: String,  // something unique
    status: String
   }],
  cardsGiven: [{
    cardPurchaseInfo: {
      creditCardNumber: Number, // is card a number or string? is this proper way to instantiate an array?
      expireMonth: Number,
      expireYear: Number
    },
    giftRecipient: String,
    occassion: String,
    cliqueCardCode: Number,
    mobileNumber: String
  }],
  cardsReceived: [{
    amount: String,
    occassion: String,
    giftBuyer: String,
    cardId: String,
  }],
  account: {
    ledger: Number, // linked to Subledger API - credits/refunds
    amount: Number, // need money math module
    transactions: [{
      giftsPurchased: Number,
      giftsReceived: Number,
      amountSpent: Number,
      timestamp: {
        type: Date,
        default: Date.now
      },
    }]
  }

});

PersonaSchema.methods.generateUniqueLink = function(options, urlpath, callback) {
  
  // create random id for new Buyer
  var uniqueLink= uuid.v4();

  // create new credit object
  var newCredit = {
    districtNumber: options.districtNumber,
    keyword: options.keyword,
    uniqueLink: uniqueLink,
    status: 'new'
  };

  // add card to Buyer's collection of inactiveCards
  this.inactiveCards.push(newCredit);

  // save new inactive card
  this.save(function(err, persona) {
  if(err) {
    console.log('Unable to save new inactiveCard in generateUniqueLink: ', err);
  }
    // pass back URI w/uniqueLink/id for Buyer to follow
    callback(err, 'clique.cc/' + urlpath + uniqueLink);
  });

};

var findOrCreate = function(options, callback) {
 
  var Persona = this.model('persona');

  // check if persona already exists based of their mobile number
  this.model('persona').findOne({
    contact: {
      mobileNumber: options.mobileNumber
    }
  }, function(err, persona){
    if (err) {
      console.log('findOrCreate not working: ', err);
    }
    // if persona is found return persona data to be used in generateUniqueLink
    if (persona) {
      console.log('persona already exists');
      return callback(null, persona);
    }
    // if person doesn't exist pull in data from options to create new Buyer data object
    console.log('create new persona');
    persona = new Persona({
      contact: {
        mobileNumber: options.mobileNumber
      },
      districtNumber: options.districtNumber,
      keyword: options.keyword // possibly take this out because recipient can't use this immediately
    });
    // on save, generate Unique Link for new Buyer
    persona.save(callback);
  });

};

PersonaSchema.plugin(function(schema, options) {
schema.static('findOrCreate', findOrCreate);
});

module.exports = mongoose.model('persona', PersonaSchema);