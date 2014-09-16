// require model
var Card = require('../models/persona');

function getCardInfo(request, response) {
  console.log('in getCardInfo');

  // query URI for filter
  var filter = request.params.id;
  console.log(filter);
  // find by unique link id
  Card.findOne({
    'cliqueCards.uniqueLink': filter
  })
  .exec(function(err, data){
    console.log(data);
      response.json(data);
  });

}

module.exports = {
  getCardInfo: getCardInfo
}