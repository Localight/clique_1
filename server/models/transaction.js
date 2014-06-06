'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Transaction Schema
 */


//////////// NEED MONEY MATH MODULE

 var TransactionSchema = new Schema({

  authentication: {
    tricon: String,
    secret: String,
  },
  ledger: Number, // linked to Subledger API
  // BP API ?
  getCredit: {
    from: String, // Persona | Merchant(Clerk)
    to: String, // Persona
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  spendCredit: {
    merchant: String,
    amount: Number,
    clerk: String,
    from: String, // Persona
    to: String, // Persona | Merchant(Clerk)
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  percentage: Number,

 });

 mongoose.model('transaction', TransactionSchema);

 // module.exports = mongoose.model('Transaction', TransactionSchema);