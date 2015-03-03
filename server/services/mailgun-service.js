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

function sendEmail(from, to, body, callback){
  if (!callback){
    callback = function(){};
  }

  // Create dynamic message that is sent
  mg.sendRaw(
    from, // email sender
    to, // email recipient
    body,
    function(err) {
      if (err) {
        console.log('this sucks');
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
}
