'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * Merchant Schema
 */


 var MerchantSchema = new Schema({

  type: String,
  name: String,
  manager: [{
    name: String
    }],
  bankPayoutInfo: {
    routingNumber: Number,
    accountNumber: Number
  } ,  // routing number? account number?
  locations: {
    kickbackSplit : [{
      merchant: String,
      percentage: Number
    }],
    clerks: [{
      name: String
    }],
    transactions [{
      amount: Number,
      timestamp: {
        type: Date,
        default: Date.now
      },
    }]
  }

 });

 mongoose.model('Merchant', MerchantSchema);

 // module.exports = mongoose.model('Merchant', MerchantSchema);

