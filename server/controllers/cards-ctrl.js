// require model
var Card = require('../models/persona');

function getCardInfo(request, response) {

  // query URI for filter
  var filter = request.params.id;

  // find by unique link id
  // limit results to occassion and firstName
  Card.find(
    {'cliqueCards.uniqueLink' : filter} , {'cliqueCards.occassion' : 1, 'basicProfile.firstName' : 1, _id : 0}
  )
  .exec(function(err, data){
      response.json(data[0]);
  });

}

module.exports = {
  getCardInfo: getCardInfo
}