// require balanced payment module
balanced = require('balanced-official');

var Merchant = require('../models/merchant') // require personas model

function registerMerchant(request, response) {
  response.render('layouts/merchant-registration');
}

// function createMerchantBankAccount(routing_number, account_type, name, account_number) {
//   console.log('in createMerchantBankAccount');
//   balanced.marketplace.bank_accounts.create({
//       "routing_number": routing_number, 
//       "account_type": account_type, 
//       "name": name, 
//       "account_number": account_number
//   });

// }

function createMerchantBankAccount(request, response) {
  console.log('in createMerchantBankAccount');
  var merchant = new Merchant({
    bankPayoutInfo: {
      legalCompanyName: request.body.name,
      routingNumber: request.body.routing_number,
      accountNumber: request.body.account_number
    }
  });

  merchant.save();

}

module.exports = {
  registerMerchant: registerMerchant,
  createMerchantBankAccount: createMerchantBankAccount
}