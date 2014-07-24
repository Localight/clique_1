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

function createMerchantBankAccount(request, response) {
  console.log('in createMerchantBankAccount');

  // function callback() {
  //   balanced.get('/bank_accounts/BA1iEIPYJTUkoLwDVNqWzqsd')
  //   .credit({
  //     "amount": "1",
  //     "appears_on_statement_as": "CliquePayment"
  //   });
  // } 

  // console.log(request.body.uri);
  balanced.get(request.body.uri)
  .debit({
    "appears_on_statement_as": "CliqueGiftCard", 
    "amount": "1", 
    // "amount": request.body.Amount, 
    "description": "Clique Gift Card Purhcase of"
  })

  // this part needs to go in a different function dealing with payouts
  // .then(function(){
  //   balanced.get('/bank_accounts/BA1iEIPYJTUkoLwDVNqWzqsd').credit({
  //       "amount": "1",
  //       "description": "Payout for order #1111"
  //   });
  // });






  // console.log(get);
  // var merchant = new Merchant({
  //   bankPayoutInfo: {
  //     legalCompanyName: request.body.name,
  //     routingNumber: request.body.routing_number,
  //     accountNumber: request.body.account_number
  //   }
  // });

  // merchant.save();

}

function charge(request, response) {
  console.log('in charge');
  balanced.get('/bank_accounts/BA1iEIPYJTUkoLwDVNqWzqsd')
  .credit({
    "amount": "1",
    "appears_on_statement_as": "CliquePayment"
  });
  response.end();
}

module.exports = {
  registerMerchant: registerMerchant,
  createMerchantBankAccount: createMerchantBankAccount,
  charge: charge
}