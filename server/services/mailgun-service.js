/**
 * Everything needed for mailing
 */


// Insantialize variables
var mg, 
    domain, 
    key, 
    from;



// Require needed modules
var Mailgun = require('mailgun').Mailgun,
    Mailcomposer = require('mailcomposer').MailComposer,
    emailTemplates = require('email-templates');

// Setup function to be used on server activation
function setup(config) {
    key = config.apiKey;
    domain = config.domain;
    mg = new Mailgun(key);
    from = config.from
};

// function test(){

// mg.sendRaw('noreply@clique.cc',
//         'ag.saldivar@gmail.com',
//         'From: ag.saldivar@gmail.com' +
//           '\nTo: ' + 'recipient1@example.com, http://example.com/recipient2' +
//           '\nContent-Type: text/html; charset=utf-8' +
//           '\nSubject: I Love Email' +
//           '\n\nBecause it\'s just so awesome',
//         function(err) { err && console.log(err) });

// }

function sendEmail(to, subject, body, html, attachments){

  var mailComposer = new Mailcomposer(); // Create new Mailcomposer instance

  // setup message data
  mailComposer.setMessageOption({
      from: from
      , to: to
      , subject: subject
      , body: body || html
      , html: html
  });

  // Create dynamic message that is sent
  mg.sendRaw(
    from, // email sender
    to, // email recipient
    'From: sender@example.com' +
      '\nTo: ' + 'recipient1@example.com, http://example.com/recipient2' +
      '\nContent-Type: text/html; charset=utf-8' +
      '\nSubject: I Love Email' +
      '\n\nBecause it\'s just so awesome',
    function(err) { err && console.log(err) }
  );

}

module.exports = {

  setup: setup,
  sendEmail: sendEmail,
  // test: test

}