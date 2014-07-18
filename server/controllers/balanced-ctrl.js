
function registerMerchant(request, response) {
  response.render('layouts/merchant-registration');
}


module.exports = {
  registerMerchant: registerMerchant
}