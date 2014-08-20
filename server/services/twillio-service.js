'use strict';

var twilio = require('twilio');
var client;

function init (acctSid, authToken) {

  client = twilio(acctSid, authToken);

}

var giftConfirmationText = function (to, from, message, callback) {

  // client = twilio(acctSid, authToken);

  client.messages.create({
      body: message,
      to: to,
      from: from
  }, 

  function(err, twilioResponse) {
      // process.stdout.write(twilioResponse.sid);
      callback(err, twilioResponse)
  });

};

module.exports = {
    init: init,
    giftConfirmationText: giftConfirmationText,
};