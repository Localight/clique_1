'use strict';

var Persona = require('../models/persona') // require personas model
var twilio = require('../services/twillio-service'); // require twilio service
// var balancedPayments = require('../services/balanced-payments-service'); // require balanced payments service

var mailgun = require('../services/mailgun-service'); // require mailgun service
var uuid = require('node-uuid');

function createBuyer(request, response) {

  // for some (scope) reason request.body.UniqueLink/To gets lost in the exec callback so I declared it here so it can be used globally
  var link = request.body.UniqueLink;
  var to = request.body.PhoneNumber;
  var date = new Date() // date to be used in mailgun

  // find Buyer based off created persona uniqueLink from twilio webhook
  Persona.findOne({
    'publicCards.$.uniqueLink': request.body.uniqueLink
  })
  .exec(function(err, persona){
    if (err){
      console.log("createBuyer error: ", err);
    }
    // loop through Buyer's publicCards to find correspoding uniqueLink
    for (var i in persona.publicCards){
      if (persona.publicCards[i].uniqueLink === link){
        var from = persona.publicCards[i].districtNumber;
        break;
      }
    }

    // create profile for Buyer
    persona.basicProfile.firstName = request.body.From;
    persona.basicProfile.contact.mobileNumber = request.body.PhoneNumber;
    persona.basicProfile.contact.email =  request.body.Email ;

    // create gift card for Buyer
    persona.cardsGiven.amount = request.body.Amount;
    persona.cardsGiven.giftRecipient = request.body.To;
    persona.cardsGiven.occassion = request.body.Occasion;
    persona.cardsGiven.cliqueCardCode = request.body.Code;
    persona.cardsGiven.status = "loaded"; // "loaded" designates credits not working yet
    persona.cardsGiven.cliqueId = link; // not working yet

    persona.publicCards.uniqueLink = request.body.uniqueLink;
    // finish all this crap
    // if ( /* last four match */ true){
    //   persona.creditCards.push(
    //     // cardPurchaseInfo should go under persona.creditCards (create this in the model)
    //     {
    //     creditCardNumber: request.body.CreditCardNumber, 
    //     expireMonth: request.body.ExpireMonth,
    //     expireYear: request.body.ExpireYear,
    //     }
    //   )
    // }

    persona.cardsGiven.push({
      giftRecipient: request.body.To,
      occassion: request.body.Occasion,
      cliqueCardCode: request.body.Code
    });

    persona.save(function(err, persona){
      if (err) {
        console.log('createBuyer')
      }

    });

    console.log('buyer created');

    // send receipt/confirmation email to Buyer
    mailgun.sendEmail(
      'gift-confirm@clique.cc',
      request.body.Email,
      'From: gift-confirm@clique.cc' +
        '\nTo: ' + request.body.Email +
        '\nContent-Type: text/html; charset=utf-8' +
        '\nSubject: Your Clique Card has been sent!' +
        // '\n\nYou have just sent '+ request.body.To +' a $'+ request.body.Amount +' Clique Gift Card.',
        '\n\n'+ request.body.From +', your gift of $'+ request.body.Amount +' is on it&#39;s way to '+ request.body.To +'! With the CLIQUE Local Gift Card you can apply your gift toward purchases at numerous locally-owned merchants in the Long Beach area, including Doly&#39;s Delectables at 245 E Broadway, Long Beach, CA.<br><br>'+' CLIQUE stands for...'+'Cooperative of Local Independent Quality Urban Establishments<br>'+'<em>Yes, that&#39;s a mouthful :-)</em><br><br>'+' CLIQUE is a Localism Project.'+' Did you know three times more money stays in our local economy when we buy from local businesses instead of big chains? That translates to more local jobs, and more of the unique shops, eateries and other businesses that give our city it&#39;s character. Make a difference with your dollars and support independent merchants.<br><br>'+' ~ The Localism Team<br><br>'+' Visit Localism.co to see what we&#39;re all about!<br><br>'+'________________________________<br><br>'+'GIFT RECEIPT '+ date +'<br><br>Amount: $'+ request.body.Amount +' Sent to '+ request.body.To +' at '+ request.body.PhoneNumber +'<br><br>Transaction ID: '+ link + '<br><br>________________________________<br><br>'+'235 E Broadway '+'Eighth Floor '+'Long Beach, CA 90802 '+'<br><br>© 2014 Localism Inc. All rights reserved. '+'<br><br>Questions? Call is at (877) 752-1550 or email hello@localism.co',
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


function saveBuyerCardId(request, response) {

  // find Buyer with unqiueLink
  Persona.findOne(
    {'publicCards.uniqueLink': request.body.UniqueLink}
  )
  .exec(function(err, persona) {
    if (err) {
      console.log('saveBuyerCardId error: ', err);
    }
    console.log(persona);
    for (var i=0; i<persona.publicCards.length; i++){
      if (persona.publicCards[i].uniqueLink == request.body.UniqueLink) {
        console.log("almost there");

        // save card ID created by BP for user
        persona.basicProfile.bpCardId = request.body.bpCardId;

        // change status of card to active
        persona.publicCards.status = "activated"; // not working yet

        // create profile for Buyer
        persona.basicProfile.firstName = request.body.From;
        persona.basicProfile.contact.mobileNumber = request.body.PhoneNumber;
        persona.basicProfile.contact.email =  request.body.Email ;

        // create gift card for Buyer
        persona.publicCards[i].amount = request.body.Amount;
        persona.publicCards[i].giftRecipient = request.body.To;
        persona.publicCards[i].occassion = request.body.Occasion;
        persona.publicCards[i].cliqueCardCode = request.body.Code;
        persona.publicCards[i].status = "loaded"; // "loaded" designates credits
        // persona.publicCards.cliqueId = link; // not working yet
      }
    }

    // save newly created Persona basicProfile and 
    persona.save(function(err, cardId) {
      if (err) {
        console.log('saveBuyerCardId error: ', err);
      }
      console.log('Buyer BP Card ID saved');
    });

  });  

}


function createRecipient(request, response){

  var to = request.body.PhoneNumber; // Recipient number
  var from = '15622836856'; // twilio account number

  // pass along unique id
  var uniqueLink = request.body.UniqueLink;

  // create Recipient persona
  var person = new Persona({
    basicProfile: {
      firstName: request.body.To,
      contact: {
        mobileNumber: request.body.PhoneNumber
      }
    },
    cardsReceived: [{
      cardId: request.body.UniqueLink,
      amount: request.body.Amount,
      occassion: request.body.Occasion,
      giftBuyer: request.body.From,
    }]
  });

  //  save created Recipient persona
  person.save(function(err, person){
    if (err) {
      console.log('unable to create Recipient b/c err: ', err);
    }
    console.log('recipient saved');

    // create unique URI path for recipient landing page
    var uniqueCreditLink = 'clique.cc/recipient-gift-card/' + uniqueLink;

    // get icon type for icon in sms message
    var iconType = request.body.Icon;

    if (iconType == 'birthday') {
      var icon = '🍰';
      var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' gift for your birthday! View it here ▸ ' + uniqueCreditLink;  
    }
    else if (iconType == 'wedding'){
      var icon = '💍';
      var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' wedding gift! View it here ▸ ' + uniqueCreditLink;  
    }    
    else if (iconType == 'anniversary'){
      var icon = '💞';
      var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' gift for your anniversary! View it here ▸ ' + uniqueCreditLink;  
    }    
    else if (iconType == 'baby'){
      var icon = '🚼';
      var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' gift for your baby! View it here ▸ ' + uniqueCreditLink;        
    }    
    else if (iconType == 'love'){
      var icon = '💝';
      var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' gift! View it here ▸ ' + uniqueCreditLink;        
    }    
    else if (iconType == 'sympathy'){
      var icon = '💐';
      var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' gift and a thoughtful note. View it here ▸ ' + uniqueCreditLink;        
    }    
    else if (iconType == 'getwell'){
      var icon = '🎈';
      var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' gift to cheer you up. View it here ▸ ' + uniqueCreditLink;        
    }    
    else if (iconType == 'thankyou'){
      var icon = '😊';
      var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' gift to say thank you! View it here ▸ ' + uniqueCreditLink;        
    }    
    else if (iconType == 'congrats'){
      var icon = '🏆';
      var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' gift to congratulate you! View it here ▸ ' + uniqueCreditLink;        
    }    
    else if (iconType == 'custom'){
      var icon = '🎁';
      var message = icon + request.body.To + ', ' + request.body.From + ' sent you a $' + request.body.Amount + ' gift! View it here ▸ ' + uniqueCreditLink;        
    } 

  if (message){
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
  }

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
  saveBuyerCardId: saveBuyerCardId,
  createRecipient: createRecipient
};