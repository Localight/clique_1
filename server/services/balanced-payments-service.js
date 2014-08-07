balanced = require('balanced-official');
subledger = require('./subledger-service');

function init(apiKey) {

  balanced.configure(apiKey);
  //  subledger.organization(org_id).book(book_id)

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

  // retrieve subledger acct_id 
  // SUBLEDGER post journal entry (journal entries should always sum to zero)
    // debit the card


}

// add split payment functionality
// payout Merchant (and Localism)
function creditAccount() {

  balanced.get('/bank_accounts/BA1iEIPYJTUkoLwDVNqWzqsd').credit({
      "amount": 100000, // param accepts amount in cents
      "description": "Payout for order #1111"
  });

}



module.exports = {
  init: init,
  createCard: createCard,
  debitCard: debitCard,
  creditAccount: creditAccount
}