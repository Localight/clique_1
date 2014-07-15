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
    mailerService = require('./server/services/mailgun-service'),
    balancedService = require('./server/services/balanced-payments-service');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./server/config/config');
var db = mongoose.connect(config.db);

// Initialize Modules ************

twilioService.init(config.twilio.acctSid, config.twilio.authToken); // Twilio

mailerService.init(config.mailgun); // Mailgun

balancedService.init(config.balancedPayments); // Balanced Payments

// ********************************



// ********************************
// **********Test Shit*************

// balancedService.createCard();

// balancedService.debitCard();

// balancedService.creditAccount();

// mailerService.test();

// ********************************
// ********************************



// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')(passport, db);

// Start the app by listening on <port>, optional hostname
app.listen(config.port, config.hostname);
console.log('Mean app started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');

// Initializing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;
