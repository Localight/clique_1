'use strict';
/**
 * Twillio service. Does three things:
 * - init: sets up Twillio API key.
 * - hook: listens for POSTs from Twillio
 * - send: sends a given TEXT to a given # via Twillio
 */

var twilio = require('twilio');
var client;

function init (acctSid, authToken) {

  client = twilio(acctSid, authToken);

}

// function hook (req, res) {
//     // create personas or load existing etc
//     // district # bought from twilio
//     // when twilio gets a text from this number 
// }

function send (message, to, from, callback) {

  client.messages.create({
      body: message,
      to: to, 
      from: from, 
  }, function(err, message) {
      callback(err);
      process.stdout.write(message.sid);
  });

}

module.exports = {
    init: init,
    // hook: hook,
    send: send,
    // twilio: {
    //   accountSid: 'ACe8d75f03c7da98de3c02c0a83e5650d1',
    //   authToken: 'b7a0fe30122543a393a07707bcb419b6'
    // }
};