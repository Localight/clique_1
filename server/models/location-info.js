'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LocationInfoSchema = new Schema({

  mainPhone: String,
  district: String,
  establishmentName: String,
  locationNumber: Number,
  managerName: String,
  addressLineOne: String,
  addressLineTwo: String,
  email: String,
  typeOfEstablishment: String,
  details: String,
  // tricon: [{
  //   general: String,
  //   name: String,
  //   tricon: 
  // }]

});

module.exports = mongoose.model('LocationInfo', LocationInfoSchema);