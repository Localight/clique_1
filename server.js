'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    logger = require('mean-logger');

// var twilio = require('twilio');
// // var twilioInit = require('services/twilio-service.js');
// var accountSid = 'ACe8d75f03c7da98de3c02c0a83e5650d1';
// var authToken = 'b7a0fe30122543a393a07707bcb419b6';
// var client = twilio(accountSid, authToken);

// client.messages.create({
//     body: 'this is what it looks like when twilio works with node. -alex',
//     to: '+17143569284',
//     from: '+16572207232'
// }, function(err, message) {
//     process.stdout.write(message.sid);
// });

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./server/config/config');
var db = mongoose.connect(config.db);

// twillioService.init(config.twillio.key);

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')(passport, db);

// Start the app by listening on <port>, optional hostname
app.listen(config.port, config.hostname);
console.log('Mean app started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');

// Initializing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;
