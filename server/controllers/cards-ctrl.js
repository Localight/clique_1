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

// find card by id and add status of spent
function spendCard(request, response) {

  Card.find({
    'cliqueCards.uniqueLink': request.body.cardId
  })
  .exec(function(err, data) {
    for(var i=0; i<data[0].cliqueCards.length;i++) {
      if(data[0].cliqueCards[i]) data[0].cliqueCards[i].status = 'spent';
      
      data[0].save(function(err, data) {
        if (err) console.log('Could not update card spent status b/c: ', err);
        else console.log('card status updated to spent');
      });
    };
  });

  // Card.update(
  // {'cliqueCards.uniqueLink' : request.body.cardId},
  // {$set: {'cliqueCards.status': 'spent'}}
  // );
}

module.exports = {
  getCardInfo: getCardInfo, 
  spendCard: spendCard
}