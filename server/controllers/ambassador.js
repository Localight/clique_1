'use strict';

var LocationInfo = require('../models/location-info');

// created for use in getRandTricon()
var merchantType = [],
    icons = [1,2,3]
    merchantType = ["eatery", "service", "wellness", "venue", "market", "shop", "hospitality", "vendor", "attraction"]; 

// function to generate random tricons
// var getRandTricon = function (data) {

//   var tricon = [];

//   // loop through merchantType to find proper hundredths place value
//   for (var i=0; i<merchantType.length; i++) {
//     if (mongo search merchant type results === merchantType[i]) {
//       var hundredths = i + 1;
//     }
//   }

//   // loop through to get an array of ones digits for tricon
//   // tricon will look like ['e101', 'e104', 'e107']
//   for (var i=0; i<icons.length; i++) { 
//     tricon.push(Math.floor((Math.random() * 10) + 1));
//   }

//   if (tricon != mongo search existing tricon results) {
//     break;
//   }
//   else {
//     getRandTricon();
//   }

//   // return tricon code for merchant
//   if (tricon.length === 3) {
//     for (var i=0; i<tricon.length; i++) {
//       tricon[i] = 'e' + hundredths + '0' + tricon[i];
//     }
//   }

//   return tricon;

// };


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

  // send back to Ambassador app the id that mongo creates
  location.save(function(err, save){
    if (err) {
      console.log(err)
    }
    else {
      response.end('after the save')
    }
  });

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
  console.log('in createTricon');
  /*
  1. generate 3 character tricon
  2. find location by district#
  3. if tricon exists in district# generate new tricon
    -if tricon exists repeat step 3
    -else save to locationInfo db and save to district#DB
  4. if tricon doesn't exist save to locationInfoDB and save to district#DB
  5. 
  */

  console.log(request.body.myID);

  var newTricon = getRandTricon(request.body);

  LocationInfo.find({_id: request.body.myID})
  .exec(function(err, data){
    if (err) console.log('cant find location info b/c: ', err);
    else console.log('this is the location info: ', data);
    // save all the information sent over to me as well as the tricon code
  })

  // response.json("{tricon:"+newTricon+"}");
  response.send({"tricon": newTricon});

}

module.exports = {
  createInfo: createInfo,
  getInfo: getInfo,
  createTricon: createTricon
}




