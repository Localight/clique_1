'use strict';

var twilio = require('../controllers/twilio');
var gifts = require('../controllers/gifts-ctrl');
var ambassador = require('../controllers/ambassador')

module.exports = function(app) {

  // Home route
  var index = require('../controllers/index');

  // app.get('/test', function(req, res){
  //   var msg = req.query.msg;
  //   twilioService.send('Msg: ' + msg, '+17143569284', '+16572207232', function(err){
  //     if (err){
  //       console.log('did not send ', err);
  //     }
  //     res.end('sent');
  //   });
  // });

  // app.get('/home', function(req, res) {
  //     res.sendfile('../../public/clique/views/home.html');
  // });

  // app.post('/app/numbers/:districtNumber/sms', function(request, response) {
  app.post('/app/sms', twilio.initialResponseSavePersona);

  app.post('/api/locationinfo', ambassador.createInfo)

  app.get('/new-gift-card/:id', gifts.render);

  app.route('/')
      .get(index.render);

  // app.get('/gifts/:giftId', gifts.render);
  // app.post('/gifts', gifts.postGift);

};
