// no node-module, so requiring minified js file
var Subledger = require('subledger').Subledger;

// initialize objects to be used globally
var subledger = null,
    balanceSheet = null,
    report = null,
    depositors = null,
    uncleared = null;

// initialize subledger connection
function init (oAuthKey, oAuthSecret, orgId, bookId, depositorId, unclearedId, balanceSheetId) {

  // new instance of connector
  subledger = new Subledger();

  // set subledger credentials
  subledger.setCredentials(oAuthKey,oAuthSecret);

  // configure report with organization/report IDs
  report = subledger.organization(orgId).book(bookId);

  // configure Balance Sheet
  balanceSheet = report.report(balanceSheetId)

  // configure Depositor category
  depositors = report.category(depositorId);

  // configure Uncleared category
  uncleared = report.category(unclearedId); 

}

// helper function for Journal createAndPost
var journalCreateAndPost = function (description, account_id_debit, account_id_credit, amount) {

  // create and POST journal entries
  report.journalEntry()
  .createAndPost({
    "effective_at": (new Date()).toISOString(),
    "description": description,
    "lines": [
     {
       "account": account_id,
       "value": {
         "type": "debit",
         "amount": amount
       }
     },
     {
       "account": account_id,
       "value": {
         "type": "credit",
         "amount": amount
       }
     }
    ]
  },
  function (error,apiRes){
    if (error) {
      console.log(error);
    }
    else {
      // get Buyer's ID
      console.log('journal entry successful');
    }
  });

}

// this function performs the accounting associated with line 28 of the Gist
function buyerGiftsRecipient (buyerName, recipientName, giftAmount) {

  console.log('in buyerGiftsRecipient controller');

  // create Buyer account
  report.account()
  .create({
   "description": buyerName,
   "normal_balance": "debit"
  },
  function (error,apiRes){
    if (error) {
      console.log(error);
    }
    else {
      // get Buyer's ID
      console.log('Account ' + buyerName + ' created');
      var buyerId = apiRes.active_account.id;
    }
  });

  // attach Buyer account to Depositors category
  depositors.attach({
    account: buyerId
  },
  function (error,apiRes){
    if (error) {
      console.log(error);
    }
    else {
      // get Buyer's ID
      console.log(buyerName + ' account associated with Depositors category');
    }
  });

  // create Recipient category
  report.category()
  .create({
    "description": recipientName,
    "normal_balance": "credit"
  },
  function (error,apiRes){
    if (error) {
      console.log(error);
    }
    else {
      // get Buyer's ID
      console.log('Category ' + recipientName + ' created');
      var recipientId = apiRes.active_category.id;
    }
  });

  // attach Recipient category to Card Holders category
  balanceSheet.attach({
    category: recipientId,
    parent: "WVtSchIrT5W2EYeLakULgB" // Card Holders ID
  },
  function (error,apiRes){
    if (error) {
      console.log(error);
    }
    else {
      // get Buyer's ID
      console.log(recipientName + ' category associated with Card Holders category');
    }
  });

  // create Card category for Recipient
  report.category()
  .create({
    "description": "Card",
    "normal_balance": "credit"
  },
  function (error,apiRes){
    if (error) {
      console.log(error);
    }
    else {
      // get Buyer's ID
      console.log('Category Card created');
      var cardId = apiRes.active_category.id;
    }
  });

  // attach Card to Recipient category
  balanceSheet.attach({
    category: recipientId,
    parent: "WVtSchIrT5W2EYeLakULgB" // Card Holders ID
  },
  function (error,apiRes){
    if (error) {
      console.log(error);
    }
    else {
      // get Buyer's ID
      console.log('Card category associated with '+ recipientName +' category');
    }
  });

  //::lines refer to Gist::\\

  // lines 29 & 30
  journalCreateAndPost("charge buyer: " + buyerName, buyerId, buyerId, giftAmount);
  
  // lines 32 & 33
  journalCreateAndPost(buyerName + "'s uncleared money", uncleared_category_id, cardId, giftAmount);  

  // lines 35 & 36
  journalCreateAndPost("Processing for card: " + cardId, uncleared_category_id, cardId, (giftAmount*.029)+.30);


}

// when does the credit card clear? waiting on callback from Balanced Payments?
// credit card is cleared and funds are added to Cash account
function ccClears (card, amount) {

  journalCreateAndPost("Card: " + card + " cleared", "FASMazb4pgDYKf8xykIGM5", "eml3U9NiHaauqimfRwCQLz", amount);

}

module.exports = {
  init: init,
  buyerGiftsRecipient: buyerGiftsRecipient
}