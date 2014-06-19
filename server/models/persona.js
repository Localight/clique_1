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
  status: String, // Recipient/Patron/Clerk/Dormant(old user, no response)/Zombie(never clicked anything)
  inactiveCards: [{    // holds all cards user has texted for, but not yet activated.
    districtNumber: String,
    keyword: String,
    uniqueLink: String,  // something unique
    status: String
   }],
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

PersonaSchema.methods.generateCreditLink = function(options, callback) {
  
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
    callback(err, 'https://48531bed.ngrok.com/new-gift-card/' + uniqueLink);
  });

};

// PersonaSchema.methods.makeLinkActive = function(link, callback) {
// blink();
// };
/**
* find or create persona plugin
**/

var findOrCreate = function(options, callback) {

  this.model('persona').findOne({
    contact: {
      mobileNumber: options.mobileNumber
    }
  }, function(err, persona){
    if (err) {
      console.log('crapped out ', err);
    }
    if (persona) {
      console.log(persona);
      console.log('persona already exists');
      // do something with this already existing person
    }
  });
};
// function findOrCreate = function(options, callback) {
// var self = this;
// // 1. try to find a persona with this mobile num.
// // - if you find it, call the callback with it as a (second) param
// // eg. Persona.find({contact.districtNumber: options.mobileNumber})
// //      self.mobile
// //      .exec(function(err, persona) {
// //          if(err) {
// //              return callback (err);
// //          }
// //          if(persona !== null) {
// //              return callback(null, persona);
// //          };
// //          // if we reached up to here, means there's no such person.
// //          so create a new person with options.mobileNumber and options.districtNumber and persona.save(and within the cb here, 
// //          call back the original callback;
// //          
// //      });
// };

PersonaSchema.plugin(function(schema, options) {
schema.static('findOrCreate', findOrCreate);
});

mongoose.model('persona', PersonaSchema);

// Persona.findOrCreate({
// mobileNumber: '1234',
// districtNumber: '321',
// name: 'Super Me!'
//    }, function(err, person) {
//         // twilio.send or create that link or something.
//    });

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////




module.exports = mongoose.model('persona', PersonaSchema);