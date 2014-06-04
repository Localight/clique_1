'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

/**
 * Transaction Schema
 */


//////////// NEED MONEY MATH MODULE

 var TransactionSchema = new Schema({

  amount: Number,
  percentage: Number,
  timestamp: {
    type: Date,
    default: Date.now
  },
  from: String, // Persona
  to: String,   // Persona | Merchant(Clerk)
  buy: String,
  spend: String

 });

 mongoose.model('Transaction', TransactionSchema);

 // module.exports = mongoose.model('Transaction', TransactionSchema);