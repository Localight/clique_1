'use strict';

// require necessary controllers
var twilio = require('../controllers/twilio');
var gifts = require('../controllers/gifts-ctrl');
var ambassador = require('../controllers/ambassador');
var person = require('../controllers/persona-ctrl');

module.exports = function(app) {

  // Home route
  var index = require('../controllers/index');

  // web hook for initial text to activate card
  app.post('/app/sms', twilio.initialResponseSavePersona);

  // link credit buyer follows
  app.get('/new-gift-card/:id', gifts.render);

  // collect buyer info
  app.post('/api/buyer', person.createBuyer);

  // save info of persona activating card
  // app.post('/api/credit-buyer', buyer.addInfo);

  app.post('/api/locationinfo', ambassador.createInfo);

  app.route('/')
      .get(index.render);

  // app.get('/gifts/:giftId', gifts.render);
  // app.post('/gifts', gifts.postGift);

};
