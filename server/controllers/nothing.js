$(document).ready(function () {
    // Callback for handling responses from Balanced
    // or a catcher, reciever
    function catchResponse(ball) {
        // Successful tokenization
        if (ball.status_code === 201) {
            var fundingInstrument = ball.cards != null ? ball.cards[0] : ball.bank_accounts[0];
            // Call your backend
            jQuery.post("/path/to/your/backend", {
                uri: fundingInstrument.href
            }, function(r) {
                // Check your backend response
                if (r.status === 201) {
                    // Your successful logic here from backend ruby
                } else {
                    // Your failure logic here from backend ruby
                }
            });
        } else {
            // Failed to tokenize, your error logic here
        }

        // Debuging, just displays the tokenization result in a pretty div
        $('#response .panel-body pre').html(JSON.stringify(ball, false, 4));
        $('#response').slideDown(300);
    }

    // pitchers, senders
    // Click event for tokenize credit card
    $('#cc-submit').click(function (e) {
        e.preventDefault();

        $('#response').hide();

        var payload = {
            name: $('#cc-name').val(),
            number: $('#cc-number').val(),
            expiration_month: $('#cc-ex-month').val(),
            expiration_year: $('#cc-ex-year').val(),
            cvv: $('#cc-cvv').val(),
            address: {
                postal_code: $('#ex-postal-code').val()
            }
        };

        // Tokenize credit card
        balanced.card.create(payload, handleResponse);
    });

    // Click event for tokenize bank account
    $('#ba-submit').click(function (e) {
        e.preventDefault();

        $('#response').hide();

        var payload = {
            name: $('#ba-name').val(),
            account_number: $('#ba-number').val(),
            routing_number: $('#ba-routing').val(),
            account_type: $('#ba-account-type').val()
        };

        // Tokenize bank account
        balanced.bankAccount.create(payload, handleResponse);
    });

    // Simply populates credit card and bank account fields with test data
    $('#populate').click(function () {
        $(this).attr("disabled", true);

        $('#cc-name').val('John Doe');
        $('#cc-number').val('4111111111111111');
        $('#cc-ex-month').val('12');
        $('#cc-ex-year').val('2020');
        $('#ex-csc').val('123');
        $('#ex-postal-code').val('94301');
        $('#ba-name').val('John Doe');
        $('#ba-number').val('9900000000');
        $('#ba-routing').val('321174851');
    });
});
