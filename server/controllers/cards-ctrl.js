// require model
var Card = require('../models/persona'); // require persona model
var twilio = require('../services/twillio-service'); // require twilio service

function getCardInfo(request, response) {

  // query URI for filter
  var filter = request.params.id;

  // find by unique link id
  // limit results to occassion and firstName
  Card.find(
    {'cliqueCards.uniqueLink' : filter} , {'cliqueCards.occassion' : 1, 'basicProfile.firstName' : 1, 'basicProfile.totalAmount' : 1, _id : 0}
  )
  .exec(function(err, data){
      response.json(data[0]);
  });

}

// find card by id and add change status from activated to spent
function spendCard(request,response) {

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

}

function getBuyerNumber(request,response) {

  // query URI for filter
  var filter = request.params.id;
 
  // limit results to mobileNumber, firstName, districtNumber and uniqueLink
  Card.find(
    {'cliqueCards.uniqueLink': filter}, {'basicProfile.contact.mobileNumber': 1, 'basicProfile.firstName': 1, 'cliqueCards.districtNumber': 1, 'cliqueCards.uniqueLink': 1, _id: 0}
  )
  .exec(function(err, data){
      response.json(data[0]);
  });
}

function sendThankYou(request,response) {

  var to = request.body.to;
  var from = request.body.from;
  var message = request.body.message;

  twilio.sendSMS(to, from, message, 
    function(err, twilioResponse){
      if (err){
        console.log('twilio error ', err);
        response.json(500, {message: "Twilio message not sent"});
        return;
      }
      console.log('sms sent');
      response.json({message: "Twilio message sent"});
  });

}

function getAllInfo(request,response){
  console.log('getAllInfo');
}

// get data for Recipients
function getRecipientCards(request, response){
  Card.find({'basicProfile.typeOfUser': 'recipient'})
  .exec(function(err, data){
    if (err) console.log('getRecipientCards err: ', err);
    console.log(data.length)
    response.json(data);
  })
}

function spendAmount(request, response){
  console.log('spendAmount');
  // unique link
  var filter = request.params.id;

  // spend amount variable
  var spend = request.body.amount;
  console.log(spend);

  Card.find({'cliqueCards.uniqueLink': filter})
  .exec(function(err, data){
    if (err) {console.log('spendAmount err: ', err)}
    var originalAmount = data[0].basicProfile.totalAmount;
    console.log(originalAmount);
    data[0].basicProfile.totalAmount = originalAmount - spend;
    data[0].save(function(err,data){
      console.log(data);
    });
  })
}

module.exports = {
  getCardInfo: getCardInfo, 
  spendCard: spendCard,
  getBuyerNumber: getBuyerNumber,
  sendThankYou: sendThankYou,
  getAllInfo: getAllInfo,
  getRecipientCards: getRecipientCards,
  spendAmount: spendAmount
}













