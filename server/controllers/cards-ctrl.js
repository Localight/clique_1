// require model
var Card = require('../models/persona');

function getCardInfo(request, response) {

  // query URI for filter
  var filter = request.params.id;
  
  // find by unique link id
  Card.findOne({
    'cliqueCards.uniqueLink': filter
  })
  .exec(function(err, data){
      response.json(data.cliqueCards[0]);
  });

}

module.exports = {
  getCardInfo: getCardInfo
}