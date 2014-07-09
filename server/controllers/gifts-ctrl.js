/**
 * Gifts page controller.
 * - checks the gift ID, finds the persona and renders the landing page for giving gifts.
 */

 var Personas = require('../models/persona') // require personas model

function renderBuyer(request, response) {

  console.log(request.params.id);
  var uniqueLink = request.params.id;
  // find person by param then render index page
  Personas.find({uniqueLink: request.params.id})
  .exec(function(err, persona){
    // console.log(persona);
    // console.log(uniqueLink);
    response.render('layouts/default', {persona: persona, uniqueLink: uniqueLink});
  });

}

// render view for Recipient landing page
function renderRecipient(request, response) {
  response.render('layouts/recipient');
}

function postGift(req, res) {

}

module.exports = {
    renderBuyer: renderBuyer,
    renderRecipient: renderRecipient,
    postGift: postGift
};
