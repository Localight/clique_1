'use strict';

var twilio = require('twilio');
var client;

function init (acctSid, authToken) {

  client = twilio(acctSid, authToken);

}

var sendSMS = function (to, from, message, callback) {

  client.messages.create({
      body: message,
      to: to,
      from: from
  }, 

  function(err, twilioResponse) {
      callback(err, twilioResponse)
  });

};

module.exports = {
    init: init,
    sendSMS: sendSMS,
};