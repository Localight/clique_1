'use strict';

var Persona = require('../models/persona') // require personas model
// var twilio = require('twilio');
var twilio = require('../services/twillio-service');
// var twilio = require('./sendSms');

function createBuyer(request, response) {

  // validate from for twilio message

  var message = "Your Clique Gift Card is on its way!";

  // for some (scope) reason request.body.UniqueLink/To gets lost in the exec callback so I declared it here so it can be used globally
  var link = request.body.UniqueLink;
  var to = request.body.PhoneNumber;
  // var to = "+1"+request.body.PhoneNumber;
  // console.log(request.body);

  Persona.findOne({
    'inactiveCards.$.uniqueLink': request.body.uniqueLink
  })
  .exec(function(err, persona){
    if (err){
      console.log("bad link ", err);
    }
    for (var i in persona.inactiveCards){
      // console.log(persona.inactiveCards[i].districtNumber);
      console.log('outside');
      if (persona.inactiveCards[i].uniqueLink === link){
        // console.log('inside');
        var from = persona.inactiveCards[i].districtNumber;
        // console.log(from);
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
      twilio.giftConfirmationText(to, from, message, 
        function(err, twilioResponse){
          if (err){
            console.log('twilio error ', err);
            response.json(500, {message: "Twilio message not sent"});
            return;
          }
          console.log(twilioResponse);
          response.json({message: "Twilio message sent"});
      });
    });

  });

}

function createRecipient(request, response){

  var message = "Someone special just sent you a Clique Gift Card!";
  console.log(request.body);
  var to = request.body.PhoneNumber;
  var from = "+1562-283-6856";

  // var person = new Persona();

  // persona.save(function(err, persona){
  //   if (err) {
  //     // handle error
  //   }
    twilio.giftConfirmationText(to, from, message, 
      function(err, twilioResponse){
        if (err){
          console.log('twilio error ', err);
          response.json(500, {message: "Twilio message not sent"});
          return;
        }
        console.log(twilioResponse);
        response.json({message: "Twilio message sent"});
    });
  // });

}


module.exports = {
  createBuyer: createBuyer,
  createRecipient: createRecipient
};