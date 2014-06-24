/**
 * Gifts page controller.
 * - checks the gift ID, finds the persona and renders the landing page for giving gifts.
 */

 var Personas = require('../models/persona') // require personas model

function render(request, response) {
  console.log(request.params.id);
  var uniqueLink = request.params.id;
  // find person by param then render index page
  Personas.find({uniqueLink: request.params.id})
  .exec(function(err, persona){
    response.render('index', {persona: persona, uniqueLink: uniqueLink})
  })

  response.sendfile('../views/layouts/default.html');
}

function postGift(req, res) {

}

module.exports = {
    render: render,
    postGift: postGift
};
