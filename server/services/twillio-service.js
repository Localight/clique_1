'use strict';
/**
 * Twillio service. Does three things:
 * - init: sets up Twillio API key.
 * - hook: listens for POSTs from Twillio
 * - send: sends a given TEXT to a given # via Twillio
 */

var twilio = require('twilio');

function init () {
  var acctSid = 'ACe8d75f03c7da98de3c02c0a83e5650d1';
  var authToken = 'b7a0fe30122543a393a07707bcb419b6';
  var client = twilio(accountSid, authToken);
}

function hook (req, res) {
    // create personas or load existing etc
    //
}

function send () {

  client.messages.create({
      body: 'this is what it looks like when twilio works with node. -alex',
      to: '+17143569284',
      from: '+16572207232'
  }, function(err, message) {
      process.stdout.write(message.sid);
  });

}

module.exports = {
    init: init,
    hook: hook,
    send: send,
    // twilio: {
    //   accountSid: 'ACe8d75f03c7da98de3c02c0a83e5650d1',
    //   authToken: 'b7a0fe30122543a393a07707bcb419b6'
    // }
};