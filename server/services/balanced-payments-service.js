balanced = require('balanced-official');

function init(apiKey) {

  balanced.configure(apiKey);

}

// this is the callback to PCI-Compliant balanced.js function
function createCard(month, cvv, number, year, name) {
  console.log('create card');
  // create card
  balanced.marketplace.cards.create({
      "expiration_month": month, 
      "cvv": cvv, 
      "number": number, 
      "expiration_year": "20"+year, // balanced payments format must be full year
      "name": name
  });

}

// charge card
function debitCard(amount, description, statement, name) {

  // card_href is the stored href for the card
  balanced.get('/cards').debit({
      "appears_on_statement_as": statement, 
      "amount": amount, 
      "description": description,
      "name": name
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