// require balanced payment module
balanced = require('balanced-official');

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
  console.log(request);

  balanced.get(request.bpCardId)
  .debit({
    "appears_on_statement_as": "CliqueGiftCard", 
    "amount": request.amount * 100, 
    "description": "Clique Gift Card Purhcase of"
  })

}

module.exports = {
  registerMerchant: registerMerchant,
  debitBuyerCard: debitBuyerCard,
}