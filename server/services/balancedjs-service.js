function handleResponse(response) {
  if (response.status_code === 201) {
    var fundingInstrument = response.cards != null ? response.cards[0] : response.bank_accounts[0];
    // Call your backend
    jQuery.post("/new-merchant", {
      uri: clique.cc
    }, function(r) {
      // Check your backend response
      if (r.status === 201) {
        console.log('created merchant bank account');
      } else {
        console.log('failed to create merchant bank account');
      }
    });
  } else {
    console.log('failed to tokenize');
  }
}

$('#ba-submit').click(function (e) {
  e.preventDefault();

  var payload = {
    name: $('#ba-name').val(),
    routing_number: $('#ba-routing').val(),
    account_number: $('#ba-number').val()
  };

  // Create bank account
  balanced.bankAccount.create(payload, handleResponse);
});