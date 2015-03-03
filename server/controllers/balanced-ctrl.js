'use strict';
// require balanced payment module
var balanced = require('balanced-official');

//could have been planning to do this wtih twilio.
exports.registerMerchant = function(req, res){
  res.render('layouts/merchant-registration');
};
//
// exports.createMerchantBankAccount = function(req, res){
//   console.log('in createMerchantBankAccount');
//   balanced.marketplace.bank_account.create({
//
//   });
// };
//  function createMerchantBankAccount(routing_number, account_type, name, account_number) {
//    console.log('in createMerchantBankAccount');
//    balanced.marketplace.bank_accounts.create({
//        "routing_number": routing_number,
//        "account_type": account_type,
//        "name": name,
//        "account_number": account_number
//    });
//
// };
exports.debitBuyerCard = function(request, response) {
  console.log('in debitBuyerCard');
  console.log(request);

  balanced.get(request.bpCardId)
  .debit({
    'appears_on_statement_as': 'CliqueGiftCard',
    'amount': request.amount * 100,
    'description': 'Clique Gift Card Purhcase of'
  });

};
