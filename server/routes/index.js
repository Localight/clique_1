'use strict';

// require necessary controllers
var twilio = require('../controllers/twilio');
var gifts = require('../controllers/gifts-ctrl');
var ambassador = require('../controllers/ambassador');
var person = require('../controllers/persona-ctrl');

module.exports = function(app) {

  // Home route
  var index = require('../controllers/index');

  app.route('/')
      .get(index.render);

  // web hook for initial text to activate card
  app.post('/app/sms', twilio.initialResponseSavePersona);

  // link credit buyer follows
  app.get('/new-gift-card/:id', gifts.renderBuyer);

  // recipient view
  app.get('/recipient', gifts.renderRecipient);

  // redemption view
  app.get('/redemption', gifts.renderRedemption);

  // collect buyer info
  app.post('/api/buyer', person.createBuyer);

  // collect recipient info and sends recipient text with 
  app.post('/api/recipient', person.createRecipient);

  // save info of persona activating card
  // app.post('/api/credit-buyer', buyer.addInfo);


  ///////////////////////////iOS Routes/////////////////////////////

  app.post('/api/locationinfo', ambassador.createInfo);

  app.get('/api/locationinfo/:mobile_number', ambassador.getInfo);

  app.post('api/tricon', ambassador.createTricon)

  ///////////////////////end iOS Routes/////////////////////////////

  // app.get('/gifts/:giftId', gifts.render);
  // app.post('/gifts', gifts.postGift);

};




