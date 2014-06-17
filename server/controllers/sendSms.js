'use strict';

var twilio = require('twilio');

// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'ACe8d75f03c7da98de3c02c0a83e5650d1';
var authToken = 'b7a0fe30122543a393a07707bcb419b6';
var client = twilio(accountSid, authToken);

var sms = function () {

  client.messages.create({
      body: 'Jenny please?! I love you <3',
      to: '+17143569284',
      from: '+16572207232'
  }, function(err, message) {
      process.stdout.write(message.sid);
  });

};

module.exports = {
  sms:sms
};
