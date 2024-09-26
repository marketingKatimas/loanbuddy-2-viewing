$(document).ready(function () {
    $('#contactform').on('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Execute reCAPTCHA
        grecaptcha.execute('6LdmCn0nAAAAANC8dQDeC3bko97zlloPkuFcyP7_', { action: 'submit' }).then(function(token) {

            // Get form data and create a JSON object
            var formData = {
                name: $('#name').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                message: $('#message').val(),
                recaptchaToken: token
            };

            // AJAX request
            $.ajax({
                url: 'https://leadsync.com.my/api/web/contactform',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData), // Convert the object to JSON format
                success: function (response) {
                    $('#contactform').hide();
                    $('#error-contact').hide();
                    $('#success-contact').show();
                },
                error: function (xhr, status, error) {
                    console.log('Error:', error);
                    $('#error-contact').show();
                }
            });
        }).catch(function (error) {
            console.log('Error retrieving reCAPTCHA token:', error);
        })
    });

    // check reCAPTCHA ready
    grecaptcha.ready(() => {
        console.log('grecaptcha form is ready');
    })

});

document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', function () {
        // Remove non-numeric characters from the input
        phoneInput.value = phoneInput.value.replace(/\D/g, '');
    });
});
