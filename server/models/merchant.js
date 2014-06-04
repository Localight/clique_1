'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

/**
 * Merchant Schema
 */


 var MerchantSchema = new Schema({

  type: String,
  storefrontName: String,
  generalManager: String,
  basicInfo: {
    address: String,
    phoneNumber: Number,
    website: String
  },
  bankPayoutInfo: {
    legalCompanyName: String,
    routingNumber: Number,
    accountNumber: Number
  } ,  // routing number? account number?
  locations: {
    basicInfo: {
      address: String,
      phoneNumber: Number,
      website: String
    },
    manager: String,
    account: String,
    tricons: String,
    kickbackSplit : [{
      merchant: String,
      percentage: Number
    }],
    clerks: [{
      name: String
    }],
    transactions [{
      amountSpent: Number,
      timestamp: {
        type: Date,
        default: Date.now
      },
    }]
  }

 });

 mongoose.model('Merchant', MerchantSchema);

 // module.exports = mongoose.model('Merchant', MerchantSchema);

