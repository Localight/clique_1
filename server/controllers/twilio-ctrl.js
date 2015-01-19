'use strict';

var twilio = require('twilio');
var Persona = require('../models/persona');

// initial response text from Twilio & findOrCreate Persona
// connected via twilio webhook
function initialResponseSavePersona(request, response) {
  // check if persona already exists
  // add 'inactiveCard' to persona (new or existing)
  Persona.findOrCreate({
    mobileNumber: request.body.From.slice(2,12),// not sure what this does @jamesHall
    districtNumber: request.body.To,
    keyword: request.body.Body
  }, function(err, person) {
    if (err) {
      console.log('findOrCreate not saving: ', err);
    }
    // callback from findOrCreate line 149 to create Unique Link
    person.generateUniqueLink({
      districtNumber: request.body.To,
      keyword: request.body.Body,
    },
    // URI path for Buyer path
    'new-gift-card/',
    // generateUniqueLink callback line 116
    function(err, uniqueCreditLink) {
      if(err) {
        console.log('fix this ', err);
      }
      // send new Buyer Path link via twilio sms message
      var twiml = new twilio.TwimlResponse();
      twiml.message('💌📲 Send a gift to anyone in Greater Long Beach ▸ ' + uniqueCreditLink);
      response.type('text/xml');
      response.send(twiml.toString());
      // response.end();
    });
  });

}

module.exports = {
  initialResponseSavePersona: initialResponseSavePersona
};
