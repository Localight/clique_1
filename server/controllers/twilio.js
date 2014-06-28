'use strict';

var twilio = require('twilio');
var Persona = require('../models/persona');

// initial response text from Twilio & findOrCreate Persona
function initialResponseSavePersona(request, response) {

  // create Persona here
  var person = new Persona();  

  // store mobile number
  person = new Persona({
    contact: {
      mobileNumber: request.body.From
    }
  });

  Persona.findOrCreate({
    mobileNumber: request.body.From,
    districtNumber: request.body.To,
    keyword: request.body.Body
  }, function(err, person) {
    if (err) {
      console.log('dammit ', err);
    }
    person.generateCreditLink({
      districtNumber: request.body.To,
      keyword: request.body.Body,
    },
    function(err, uniqueCreditLink) {
      if(err) {
        console.log('fix this ', err);
      }

      var twiml = new twilio.TwimlResponse();
      twiml.message('Ooo exciting! A Clique Gift Card: ' + uniqueCreditLink + '. Someone is about to be very happy.');
      response.type('text/xml');  
      response.send(twiml.toString());
    });
  });

}

module.exports = {
  initialResponseSavePersona: initialResponseSavePersona
};