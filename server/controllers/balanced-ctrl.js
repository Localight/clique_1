// require balanced payment module
balanced = require('balanced-official');

// var Merchant = require('../models/merchant') // require personas model

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

function debitBuyerCard(request, response) {
  console.log('in debitBuyerCard');

  balanced.get(request.bpCardId)
  .debit({
    "appears_on_statement_as": "CliqueGiftCard", 
    "amount": 200, 
    "description": "Clique Gift Card Purhcase of"
  })
  .then(function successCallback(success){
    console.log('debitBuyerCard method success');
  },
  function failureCallback(failure){
    console.log('debitBuyerCard method failure', failure);
  });

}

function charge(request, response) {
  console.log('in charge');

  balanced.get('/bank_accounts/MP49D7DEEhJAukYqr8dLNdKM')
  .credit({
    "amount": 200,
    "appears_on_statement_as": "CliquePayment"
  });
  response.end();

}

module.exports = {
  registerMerchant: registerMerchant,
  debitBuyerCard: debitBuyerCard,
  charge: charge
}