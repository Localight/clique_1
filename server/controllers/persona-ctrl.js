'use strict';

var Persona = require('../models/persona') // require personas model

function createBuyer(request, response) {

  console.log(request.body.mainPhone);

  var person = new Persona({
    contact: {
      mobileNumber: request.body.PhoneNumber,
      email: request.body.Email
    },
    account: {
      amount: request.body.Amount,
      transactions: [{
        timestamp: new Date()
      }]
    },
    basicProfile: {
      firstName: request.body.From
    }
  });

  person.save();

}


module.exports = {
  createBuyer: createBuyer
};