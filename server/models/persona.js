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
  contact: {
    mobileNumber: String,
    email: {
      type: String,
      match: [/.+\@.+\..+/, 'Please enter a valid email']
    }
  },
  basicProfile: {
    firstName: String
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
    card: String, // is this proper way to instantiate an array?
    amount: String,
    occassion: String,
    giftBuyer: String
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



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/** 
* Add statics here 
**/
// PersonaSchema.statics.findAllPersonsWithInactiveGifts = function(stuff) {
// // this would find all inactive peopl
// };


/**
* Add instance methods
**/
/**
* somebody sent us a options obj with districtNumber, and a keyword.
* 1. check if that's already there
* 2. generate unique link
* 3. call back :)
*/

PersonaSchema.methods.generateUniqueLink = function(options, urlpath, callback) {
  
  // create random id param
  var uniqueLink= uuid.v4();

  // create new credit object
  var newCredit = {
    districtNumber: options.districtNumber,
    keyword: options.keyword,
    uniqueLink: uniqueLink,
    status: 'new'
  };

  this.inactiveCards.push(newCredit);
  this.save(function(err, persona) {
  if(err) {
    console.log('newCredit error: ', err);
    // return callback(err);
  }
    callback(err, 'clique.cc/' + urlpath + uniqueLink);
  });

};

var findOrCreate = function(options, callback) {
 
  var Persona = this.model('persona');

  this.model('persona').findOne({
    contact: {
      mobileNumber: options.mobileNumber
    }
  }, function(err, persona){
    if (err) {
      console.log('crapped out ', err);
    }
    if (persona) {
      // console.log(persona);
      console.log('persona already exists');
      return callback(null, persona);
    }
    console.log('create new persona');
    persona = new Persona({
      contact: {
        mobileNumber: options.mobileNumber
      },
      districtNumber: options.districtNumber,
      keyword: options.keyword // possibly take this out because recipient can't use this immediately
    });
    persona.save(callback);
  });

};

PersonaSchema.plugin(function(schema, options) {
schema.static('findOrCreate', findOrCreate);
});

module.exports = mongoose.model('persona', PersonaSchema);