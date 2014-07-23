
// require model
var Card = require('../models/persona');

function getCardInfo(request, response, filter) {

  // query URI for filter
  var filter = request.query.filter;

  // if there is a filter search DB based off this query
  // if (filter){
    
  // }

// find by unique link id
  Card.findOne([{
    cardsReceived: {
      amount: "75"
    }
  }])
  .exec(function(err, data){
      // response.json(data.cardsReceived[0].occasion);
      response.json(data.cardsReceived[0]);
  });

}

module.exports = {
  getCardInfo: getCardInfo
}