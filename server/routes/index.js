'use strict';

// var twillioService = require('./twillio-service');

// var gifts = require('../controllers/gifts');




module.exports = function(app) {

    // Home route
    var index = require('../controllers/index');

    app.route('/')
        .get(index.render);

    // app.post('/hooks/twillio', twillioService.hook);

    // app.get('/gifts/:giftId', gifts.render);
    // app.post('/gifts', gifts.postGift);

};
