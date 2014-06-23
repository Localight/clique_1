'use strict';

var LocationInfo = require('../models/location-info');

function createInfo(request) {

  console.log('in the ambassador controller');
  console.log(request);

  var location = new LocationInfo({

      mainPhone: request.body,
      district: request.body,
      establishmentName: request.body,
      locationNumber: request.body,
      managerName: request.body,
      addressLineOne: request.body,
      addressLineTwo: request.body,
      email: request.body,
      typeOfEstablishment: request.body,
      details: request.body

  })

}

module.exports = {
  createInfo: createInfo
}