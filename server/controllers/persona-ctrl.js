'use strict';

var Persona = require('../models/persona') // require personas model
var twilio = require('../services/twillio-service'); // require twilio service
// var balancedPayments = require('../services/balanced-payments-service'); // require balanced payments service

var mailgun = require('../services/mailgun-service'); // require mailgun service
var uuid = require('node-uuid');


function createBuyer(request, response) {

  // TODO: validate from for twilio message
  // var message = "Your Clique Gift Card is on its way!";

  // for some (scope) reason request.body.UniqueLink/To gets lost in the exec callback so I declared it here so it can be used globally
  var link = request.body.UniqueLink;
  var to = request.body.PhoneNumber;
  console.log(request.body);

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

    });

    console.log('buyer created');
    var date = new Date()
    // send receipt/confirmation email to Buyer
    mailgun.sendEmail(
      'gift-confirm@clique.cc',
      request.body.Email,
      'From: gift-confirm@clique.cc' +
        '\nTo: ' + request.body.Email +
        '\nContent-Type: text/html; charset=utf-8' +
        '\nSubject: Your Clique Card has been sent!' +
        // '\n\nYou have just sent '+ request.body.To +' a $'+ request.body.Amount +' Clique Gift Card.',
        '\n\nYour gift of $'+ request.body.Amount +' is on it&#39;s way! With the CLIQUE Local Gift Card '+ request.body.To +' can apply your gift toward purchases at numerous locally-owned merchants in the Long Beach area, including Doly&#39;s Delectables at 245 E Broadway, Long Beach, CA.'+' CLIQUE stands for...'+'Cooperative of Local Independent Quality Urban Establishments'+' Yes, that&#39;s a mouthful :-)'+' CLIQUE is a Localism Project.'+' Did you know three times more money stays in our local economy when we buy from local businesses instead of big chains? That translates to more local jobs, and more of the unique shops, eateries and other businesses that give our city it&#39;s character. Make a difference with your dollars and support independent merchants.'+' ~ The Localism Team'+' Visit Localism.co to see what we&#39;re all about!'+'________________________________'+' GIFT RECEIPT '+ date +' Amount: $'+ request.body.Amount +' Sent to '+ request.body.To +' at '+ request.body.PhoneNumber +' Transaction ID: '+ link + ' ________________________________ '+'235 E Broadway '+'Eighth Floor '+'Long Beach, CA 90802 '+'© 2014 Localism Inc. All rights reserved. '+'Questions? Call is at (877) 752-1550 or email hello@localism.co',
      function(err) { 
        if (err) {
          console.log(err);
          return response.end(500, err);
        } 
        response.end();
      }
    );

  });

}

function createRecipient(request, response){

  // console.log('in createRecipient');
  // console.log(request.body);
  // console.log('to in createRecipient: '+request.body.PhoneNumber);

  var to = request.body.PhoneNumber;
  var from = '15622836856';

  // create random id param
  // var uniqueLink= uuid.v4();
  var uniqueLink= request.body.UniqueLink;
  console.log(request.body);

  var person = new Persona({
    contact: {
      mobileNumber: request.body.PhoneNumber
    },
    basicProfile: {
      firstName: request.body.To
    },
    cardsReceived: [{
      cardId: request.body.UniqueLink,
      amount: request.body.Amount,
      occassion: request.body.Occasion,
      giftBuyer: request.body.From,
    }]
  });

  person.save(function(err, person){
    if (err) {
      console.log('unable to create Recipient b/c err: ', err);
    }
    
    console.log('recipient saved');

    // create unique link for recipient landing page
    console.log(uniqueLink);
    var uniqueCreditLink = 'clique.cc/recipient-gift-card/' + uniqueLink;

    // var message = 'Someone special just sent you a Clique Gift Card! Follow this link: ' + uniqueCreditLink+ ' and use your present at one of Long Beachs unique local shops.';

    // get icon type for icon in sms message
    
function message() {
    var iconType = request.body.Icon;

     if (iconType == 'birthday') {
      var icon = '🍰'
    }
    else if (iconType == 'wedding'){
      var icon = '💍'
    }    
    else if (iconType == 'anniversary'){
      var icon = '💞'
    }    
    else if (iconType == 'baby'){
      var icon = '🚼'
    }    
    else if (iconType == 'love'){
      var icon = '💝'
    }    
    else if (iconType == 'sympathy'){
      var icon = '💐'
    }    
    else if (iconType == 'getwell'){
      var icon = '🎈'
    }    
    else if (iconType == 'thankyou'){
      var icon = '😊'
    }    
    else if (iconType == 'congrats'){
      var icon = '🏆'
    }    
    else if (iconType == 'custom'){
      var icon = '🎁'
    } 
    
    var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' gift! View it here ▸ ' + uniqueCreditLink;

    return message;

}


    console.log('here');
    console.log(message);
    console.log('here');
    // var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' gift! View it here ▸ ' + uniqueCreditLink;

    // text unique recipient landing page
    twilio.giftConfirmationText(to, from, message(), 
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