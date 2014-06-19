'use strict';


var twilio = require('twilio');
var Persona = require('../models/persona');

// initial response text from Twilio & findOrCreates Persona
function initialResponseSavePersona(request, response) {

  // create URL here
  var google = 'google.com';

  // create success text message here
  var twiml = new twilio.TwimlResponse();
  twiml.message('Surprise! Clique! '+google);

  // create Persona here
  var person = new Persona();  

  // store mobile number
  person = new Persona({
    contact: {
      mobileNumber: request.body.From
    }
  });

  // create new credit link
  person.generateCreditLink({
    districtNumber: request.body.To,
    keyword: request.body.Body,
  },
  function(err, uniqueCreditLink) {
    if(err) {
      console.log('fuck my life');
    }
    // twiml.message('Click here and give us all yer money: ', + uniqueCreditLink);
    // twiml.send();
    var twiml = new twilio.TwimlResponse();
    twiml.message('Follow this link to send a Clique Gift Card: ' + uniqueCreditLink);
    response.type('text/xml');  
    response.send(twiml.toString());
  }
  );


  // Persona.findOrCreate({
  //   mobileNumber: '123',
  //   districtNumber: '456'
  //   whatever: 'else'
  // }, 
  // function(err, persona) {
  //   if(err) suicide();
   //  persona.generateGiftLink({
   //    districtNumber: req.body.to,
   //    keyword: req.body.Body? or something cool
   //  }, 
   //  function(err, thatCoolUniqueThingy) {
   //    if(err) goKillZlatko();
   //    twiml.message('Click here and give us all yer money: ', + thatCoolUniqueThingy);
   //    twiml.send();
   // });

  // save Persona here
  // person.save(function(err, person){
  //   if (err) {
  //     console.log('Unable to save persona; ', err);
  //     twiml.message('Sorry, there was an error. Please contact Localism');
  //     response.type('text/xml');  
  //     response.send(twiml.toString());
  //   }
  //     // send text message
  //     // response.type('text/xml');  
  //     // response.send(twiml.toString());
  //     console.log('person save');
  // });

}

module.exports = {
  initialResponseSavePersona: initialResponseSavePersona
};