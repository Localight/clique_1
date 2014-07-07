balanced = require('balanced-official');

function init(apiKey) {

  balanced.configure(apiKey);

}

// add params: request/response for testing
function createCard() {

  // create card
  balanced.marketplace.cards.create({
      "expiration_month": "12", 
      "cvv": "123", 
      "number": "5105105105105100", 
      "expiration_year": "2020"
  });

}

// charge card
function debitCard() {

  // card_href is the stored href for the card
  balanced.get('/cards').debit({
      "appears_on_statement_as": "Statement text", 
      "amount": 5000, 
      "description": "Test3"
  });

}

// add split payment functionality
// payout Merchant (and Localism)
function creditAccount() {

  balanced.get('/bank_accounts/BA1iEIPYJTUkoLwDVNqWzqsd').credit({
      "amount": 100000,
      "description": "Payout for order #1111"
  });

}



module.exports = {
  init: init,
  createCard: createCard,
  debitCard: debitCard,
  creditAccount: creditAccount
}