'use strict';

// require necessary controllers
var twilio = require('../controllers/twilio-ctrl');
var gifts = require('../controllers/gifts-ctrl');
var ambassador = require('../controllers/ambassador');
var person = require('../controllers/persona-ctrl');
var cards = require('../controllers/cards-ctrl');
var balanced = require('../controllers/balanced-ctrl');

module.exports = function(app) {

  // Home route
  var index = require('../controllers/index');

  app.route('/')
      .get(index.render);


  // web hook for initial sms to activate card
  app.post('/app/sms', twilio.initialResponseSavePersona);

  // link from sms message that buyer follows
  app.get('/new-gift-card/:id', gifts.renderBuyer);

  // collect buyer info
  app.post('/buyer', person.createBuyer);

  // collect recipient info and sends recipient text with 
  app.post('/recipient', person.createRecipient);

  // recipient view
  app.get('/recipient-gift-card/:id', gifts.renderRecipient);

  // redemption view
  app.get('/redemption/:id', gifts.renderRedemption);

  // balance view
  app.get('/balance', gifts.renderBalance);

  // money spent
  app.post('/card', cards.spendCard);

  // send Thank You message to Buyer from Recipient
  app.post('/sendThankYou', cards.sendThankYou);



  ///////////////////////// API Routes ///////////////

  // get Buyer name and message
  app.get('/api/cards/:id', cards.getCardInfo);

  // get Buyer phone number
  app.get('/api/buyernumber/:id', cards.getBuyerNumber);

  app.get('/api/recipients', cards.getRecipientCards);

  ///////////////////////// API Routes ///////////////



  ///////////////////////////iOS Routes/////////////////////////////


  app.post('/api/locationinfo', ambassador.createInfo);

  app.get('/api/locationinfo/:mobile_number', ambassador.getInfo);

  app.post('/api/tricon', ambassador.createTricon);

  ///////////////////////end iOS Routes/////////////////////////////



  ///////////////////////////BalancedPayments.js Routes/////////////

  app.get('/new-merchant', function(req, res){
    res.render('layouts/merchant-registration');
  });

  ///////////////////////////end BalancedPayments.js Routes/////////


};




