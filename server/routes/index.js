'use strict';

var twilioService = require('../services/twillio-service');

// var gifts = require('../controllers/gifts');




module.exports = function(app) {

    // Home route
    var index = require('../controllers/index');

    app.get('/test', function(req, res){
      twilioService.send(function(err){
        if (err){
          console.log('did not send ', err);
        }
        res.end('sent');
      });
    });

    app.route('/')
        .get(index.render);

    // app.post('/hooks/twillio', twillioService.hook);

    // app.get('/gifts/:giftId', gifts.render);
    // app.post('/gifts', gifts.postGift);

};
