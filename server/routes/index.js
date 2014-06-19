'use strict';

var twilio = require('../controllers/twilio');

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

  // app.post('/app/numbers/:districtNumber/sms', function(request, response) {
  app.post('/app/sms', twilio.initialResponseSavePersona);

  app.get('/new-gift-card/:id', function(request, response){
    console.log(request.params.id);
    response.end('Unique Credit Link: '+ request.params.id);
  });

  app.route('/')
      .get(index.render);

  // app.get('/gifts/:giftId', gifts.render);
  // app.post('/gifts', gifts.postGift);

};
