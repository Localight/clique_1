'use strict';

var Persona = require('../models/persona') // require personas model
var twilio = require('../services/twillio-service'); // require twilio service
var balancedPayments = require('../services/balanced-payments-service'); // require balanced payments service
var mailgun = require('../services/mailgun-service'); // require mailgun service
var uuid = require('node-uuid');


function createBuyer(request, response) {


  // create card for Buyer
  balancedPayments.createCard(
    request.body.ExpireMonth, // card expiration month
    request.body.ExpireCVV, // card CVV    
    request.body.CreditCardNumber, // card number    
    request.body.ExpireYear, // card expiration year 
    request.body.From // Buyer's name 
  );

  // charge Buyer's card
  balancedPayments.debitCard(
    request.body.Amount,
    "clique purchase of "+request.body.Amount,
    "Clique Gift Card",
    request.body.From
  );

  // TODO: validate from for twilio message
  // var message = "Your Clique Gift Card is on its way!";

  // for some (scope) reason request.body.UniqueLink/To gets lost in the exec callback so I declared it here so it can be used globally
  var link = request.body.UniqueLink;
  var to = request.body.PhoneNumber;

  Persona.findOne({
    'inactiveCards.$.uniqueLink': request.body.uniqueLink
  })
  .exec(function(err, persona){
    if (err){
      console.log("bad link ", err);
    }
    for (var i in persona.inactiveCards){
      if (persona.inactiveCards[i].uniqueLink === link){
        var from = persona.inactiveCards[i].districtNumber;
        break;
      }
    }

    persona.contact.mobileNumber = request.body.PhoneNumber;
    persona.contact.email =  request.body.Email ;
    persona.account.amountGiven = request.body.Amount;
    persona.account.amountGiven = new Date();
    persona.basicProfile.firstName = request.body.From;
    persona.cardsGiven.giftRecipient = request.body.To;
    persona.cardsGiven.occassion = request.body.Occasion;
    persona.cardsGiven.cliqueCardCode = request.body.Code;
    persona.inactiveCards.uniqueLink = request.body.uniqueLink;
    // finish all this crap
    if ( /* last four match */ true){
      persona.creditCards.push(
        // cardPurchaseInfo should go under persona.creditCards (create this in the model)
        {
        creditCardNumber: request.body.CreditCardNumber, 
        expireMonth: request.body.ExpireMonth,
        expireYear: request.body.ExpireYear,
        }
      )
    }

    persona.cardsGiven.push({
      giftRecipient: request.body.To,
      occassion: request.body.Occasion,
      cliqueCardCode: request.body.Code
    });

    // var person = new Persona({
    //   contact: {
    //     mobileNumber: request.body.PhoneNumber,
    //     email: request.body.Email
    //   },
    //   // persona.account.amountGiven
    //   account: {
    //     amount: request.body.Amount,
    //     transactions: [{
    //       timestamp: new Date()
    //     }]
    //   },
    //   basicProfile: {
    //     firstName: request.body.From
    //   },
    //   cardsGiven: [{
    //     cardPurchaseInfo: {
    //       creditCardNumber: request.body.CreditCardNumber, 
    //       expireMonth: request.body.ExpireMonth,
    //       expireYear: request.body.ExpireYear,
    //     },
    //     giftRecipient: request.body.To,
    //     occassion: request.body.Occasion,
    //     cliqueCardCode: request.body.Code
    //   }]
    // });

    persona.save(function(err, persona){
      if (err) {
        // handle error
      }
      // console.log('this should be from: '+from);
      // twilio.giftConfirmationText(to, from, message, 
      //   function(err, twilioResponse){
      //     if (err){
      //       console.log('twilio error ', err);
      //       response.json(500, {message: "Twilio message not sent"});
      //       return;
      //     }
      //     // console.log(twilioResponse);
      //     response.json({message: "Twilio message sent"});
      // });
    });
    
    // send receipt/confirmation email to Buyer
    mailgun.sendEmail(
      'gift-confirm@clique.cc',
      request.body.Email,
      'From: gift-confirm@clique.cc' +
        '\nTo: ' + request.body.Email +
        '\nContent-Type: text/html; charset=utf-8' +
        '\nSubject: Your Clique Card has been sent!' +
        '\n\nYou have just sent '+ request.body.To +' a $'+ request.body.Amount +' Clique Gift Card.',
      function(err) { err && console.log(err) }
    );

  });

}

function createRecipient(request, response){

  console.log('in createRecipient');
  console.log(request.body);
  console.log('to in createRecipient: '+request.body.PhoneNumber);

  var to = request.body.PhoneNumber;
  var from = '15622836856';

  // create random id param
  var uniqueLink= uuid.v4();

  var person = new Persona({
    contact: {
      mobileNumber: request.body.PhoneNumber
    },
    basicProfile: {
      firstName: request.body.To
    },
    cardsReceived: [{
      card: request.body.UniqueLink,
      amount: request.body.Amount,
      occassion: request.body.Occasion,
      giftBuyer: request.body.From
    }]
  });

  person.save(function(err, person){
    if (err) {
      console.log('unable to create Recipient b/c err: ', err);
    }
    // create unique link for recipient landing page
    console.log('recipient saved');

    var uniqueCreditLink = 'https://6ccf6310.ngrok.com/recipient-gift-card/' + uniqueLink;

    var message = 'Someone special just sent you a Clique Gift Card! Follow this link: ' + uniqueCreditLink+ 'to use your present at one of Long Beachs unique local shops.';

    // text unique recipient landing page
    twilio.giftConfirmationText(to, from, message, 
      function(err, twilioResponse){
        if (err){
          console.log('twilio error ', err);
          response.json(500, {message: "Twilio message not sent"});
          return;
        }
        response.json({message: "Twilio message sent"});
    });

  // find inactiveCard by unique link and change status from 'new' to 'active'
  // Persona.findOne({
  //   contact: {
  //     mobileNumber: request.body.PhoneNumber
  //   }
  // })
  // .exec(function(err, persona){
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log('you made it');
  //   console.log(persona);
  // });

  });

}


module.exports = {
  createBuyer: createBuyer,
  createRecipient: createRecipient
};