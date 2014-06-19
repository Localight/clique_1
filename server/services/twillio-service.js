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

module.exports = {
    init: init,
};