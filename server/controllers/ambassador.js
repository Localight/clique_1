'use strict';

var LocationInfo = require('../models/location-info');

function createInfo(request, response) {

  console.log('in the ambassador controller');
  // console.log(request.rawBody);
  // console.log(request._dumped);
  // response.end('end createInfo');
  // return;

  var location = new LocationInfo({

      mainPhone: request.body.mainPhone,
      district: request.body.district,
      establishmentName: request.body.establishmentName,
      locationNumber: request.body.locationNumber,
      managerName: request.body.managerName,
      addressLineOne: request.body.addressLineOne,
      addressLineTwo: request.body.addressLineTwo,
      email: request.body.email,
      typeOfEstablishment: request.body.typeOfEstablishment,
      details: request.body.details,
      managerPhone: request.body.managerPhone,
      ambassador: request.body.ambassador,
      shortName: request.body.shortName
      // add lat and lng to model and here

  });

  console.log(location);

  location.save(function(err, save){response.end('after the save')});

}

function getInfo(request, response) {

  LocationInfo.find({
    mainPhone: request.param('mobile_number')
  })
  .exec(function(err, data){
      response.json(data);
  });

}

function createTricon(request, response) {

  /*
  1. generate 3 character tricon
  2. find location by district#
  3. if tricon exists in district# generate new tricon
    -if tricon exists repeat step 3
    -else save to locationInfo db and save to district#DB
  4. if tricon doesn't exist save to locationInfoDB and save to district#DB
  5. 
  */

}

module.exports = {
  createInfo: createInfo,
  getInfo: getInfo,
  createTricon: createTricon
}




