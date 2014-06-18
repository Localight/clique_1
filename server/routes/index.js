'use strict';

// var config = require('../config/config');
var twilio = require('twilio');
var twilioService = require('../services/twillio-service');
var Persona = ('../models/persona');
// var config = require('../config/config');
// var gifts = require('../controllers/gifts');


// var fromTwilio = function(request) {
//   var sig  = request.headers['x-twilio-signature'];
//   // url  = config.twilio.messagingUrl + request.url.search, 
//   var url  = 'https://48531bed.ngrok.com/app/sms';
//   var body = request.payload || {};
//   // console.log(config.twilio.authToken);
//   // console.log(sig);
//   // console.log(url);
//   // console.log(body);
//   return twilio.validateRequest(config.twilio.authToken, sig, url, body);
// };


module.exports = function(app) {

    // Home route
    var index = require('../controllers/index');

    app.get('/test', function(req, res){
      var msg = req.query.msg;
      twilioService.send('Msg: ' + msg, '+17143569284', '+16572207232', function(err){
        if (err){
          console.log('did not send ', err);
        }
        res.end('sent');
      });
    });

    // app.post('/app/numbers/:districtNumber/sms', function(request, response) {
    app.post('/app/sms', function(request, response) {
      // console.log(fromTwilio(request));
      // if (fromTwilio(request)) {
        // var districtNumber = request.params.districtNumber;
        var google = 'google.com';
        var twiml = new twilio.TwimlResponse();
        // console.log('request: ', request.params.districtNumber);
        twiml.message('Surprise! Clique! '+google);
        response.type('text/xml');
        response.send(twiml.toString());
        console.log(request.body.From);
        console.log(request.body.To);
        // Persona.save({
        //   mobileNumber: request.body.From,
        //   districtNumber: request.body.To
        // });
        Persona.mobileNumber = request.body.From;
        Persona.districtNumber = request.body.To;
    // }
    // else {
    //   // reply('nope');
    //   console.log('hacker get out');
    // }
    });

    app.route('/')
        .get(index.render);

    // app.post('/hooks/twillio', twillioService.hook);

    // app.get('/gifts/:giftId', gifts.render);
    // app.post('/gifts', gifts.postGift);

};
