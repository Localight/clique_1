
// require model
var Card = require('../models/persona');

function getCardInfo(request, response, filter) {

  // query URI for filter
  var filter = request.query.filter;

  // if there is a filter search DB based off this query
  // if (filter){
    
  // }

  Card.find({})
  .exec(function(err, data){
      response.json(data);
  });

}

module.exports = {
  getCardInfo: getCardInfo
}