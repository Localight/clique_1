'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    logger = require('mean-logger');

/**
 * services
 */
var twilioService = require('./server/services/twillio-service'),
    mailerService = require('./server/services/mailgun-service');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./server/config/config');
var db = mongoose.connect(config.db);

// Initialize Twilio
twilioService.init(config.twilio.acctSid, config.twilio.authToken);

// Initialize Mailgun
mailerService.setup(config.mailgun);

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')(passport, db);

// Start the app by listening on <port>, optional hostname
app.listen(config.port, config.hostname);
console.log('Mean app started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');

// Initializing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;
