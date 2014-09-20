'use strict';

// require necessary controllers
var twilio = require('../controllers/twilio');
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

  // unlock to redemption view
  app.get('/unlock', gifts.unlock);

  // redemption view
  app.get('/redemption', gifts.renderRedemption);

  app.get('/recipient-gift-card', function(req, res) {
    res.render('layouts/dolys');
  });

  // money spent
  app.post('/card', cards.spendCard);

  // CHRIS' BUYER PATH
  app.get('/chris', function(req, res){
    res.render('layouts/chris');
  });


  ///////////////////////// API Routes ///////////////


  ///////////////////////// API Routes ///////////////



  ///////////////////////////iOS Routes/////////////////////////////

  app.get('/api/cards/:id', cards.getCardInfo);

  app.post('/api/locationinfo', ambassador.createInfo);

  app.get('/api/locationinfo/:mobile_number', ambassador.getInfo);

  app.post('/api/tricon', ambassador.createTricon);

  ///////////////////////end iOS Routes/////////////////////////////



  ///////////////////////////BalancedPayments.js Routes/////////////

  app.get('/new-merchant', balanced.registerMerchant);

  app.post('/charge', balanced.charge);

  ///////////////////////////end BalancedPayments.js Routes/////////


};




