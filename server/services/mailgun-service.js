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
function init(config) {
    key = config.apiKey;
    domain = config.domain;
    mg = new Mailgun(key);
    from = config.from
};

// function test(){

//   console.log('testing mailgun service');

//   mg.sendRaw('gift-confirm@clique.cc',
//           'ag.saldivar@gmail.com',
//           'From: gift-confirm@clique.cc' +
//             '\nTo: ' + 'ag.saldivar@gmail.com' +
//             '\nContent-Type: text/html; charset=utf-8' +
//             '\nSubject: Your Clique Card has been sent!' +
//             '\n\nYou have just sent Zlatko a $25 Clique Gift Card',
//           function(err) { err && console.log(err) });

// }

// function sendEmail(to, subject, body, html, attachments){
function sendEmail(from, to, body, callback){
  if (!callback){
    callback = function(){};
  }
  // var mailComposer = new Mailcomposer(); // Create new Mailcomposer instance

  // // setup message data
  // mailComposer.setMessageOption({
  //     from: from
  //     , to: to
  //     , subject: subject
  //     , body: body || html
  //     , html: html
  // });

  // Create dynamic message that is sent
  mg.sendRaw(
    from, // email sender
    to, // email recipient
    body,
    function(err) {
      if (err) {
        callback(err)
      }
      else {
        callback()
      }
    }
  );

}

module.exports = {

  init: init,
  sendEmail: sendEmail,
  // test: test

}