var Personas = require('../models/persona') // require personas model

// render view for Buyer landing page
function renderBuyer(request, response) {

  // console.log(request.params.id);
  var uniqueLink = request.params.id;

  // find person by param then render index page
  Personas.find({uniqueLink: request.params.id})
  .exec(function(err, persona){
    response.render('layouts/chris', {persona: persona, uniqueLink: uniqueLink});
  });

}

// render view for Recipient landing page
function renderRecipient(request, response) {

  // uniqueLink is pulled from URI param
  var uniqueLink = request.params.id;

  // find person by param then render index page
  Personas.find({uniqueLink: request.params.id})
  .exec(function(err, persona){
    response.render('layouts/recipient_redemption_index', {persona: persona, uniqueLink: uniqueLink});
  })  
}

// render view for Redemption landing page
function renderRedemption(request, response) {
  response.render('layouts/recipient_redemption_index');
}

// render view for Balance View landing page
function renderBalance(request, response) {
  response.render('layouts/balance');
}

module.exports = {
    renderBuyer: renderBuyer,
    renderRecipient: renderRecipient,
    renderRedemption: renderRedemption,
    renderBalance: renderBalance
};
