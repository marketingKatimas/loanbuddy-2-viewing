
$(function(){

    var form = $("#wizard");

    // Initialize form validation
    form.validate({
        errorClass: "loanfit-fields-error",
        errorPlacement: function(error, element) {
            if (element.is(":checkbox")) {
                error.insertAfter(element.parent());
            }
            else {
                element.after(error);
            }
        },
        rules: {
            // Page 1
            fullName: {
                required: true
            },
            icNo: {
                required: true
            },
            age: {
                required: true
            },
            phone: {
                required: true,
                number: true,
                minlength: 9
            },
            email: {
                required: true,
                email: true
            },
            dependents: {
                required: true
            },

            // Page 2
            employmentStatus: {
                required: true
            },
            jobTitle: {
                required: true
            },
            workDuration: {
                required: true,
                number: true
            },
            monthlyExpenses: {
                required: true,
                number: true
            },
            monthlyIncome: {
                required: true,
                number: true
            },
            otherIncome: {
                required: true,
                number: true
            },

            // Page 3
            loanType: {
                required: true
            },
            loanPurpose: {
                required: true
            },
            loanAmount: {
                required: true,
                number: true
            },
            loanDuration: {
                required: true,
                number: true
            },
            loanTermsCondition: {
                required: true
            }
        },
        // messages: {
        //     fullName: "Please enter your full name",
        //     icNo: "Please enter your IC No",
        //     email: "Please enter a valid email address",
        //     phone: "Please enter your phone number"
        // }
        messages: {
            phone: {
                number: "Please enter a valid phone number",
                minlength: "Please enter a valid phone number",
            }
        }
    });

	$("#wizard").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 500,
        labels: {
            finish: "Hantar",
            next: "Seterusnya",
            previous: "Kembali"
        },
        // Validate before going to the next step
        onStepChanging: function (event, currentIndex, newIndex) {
            // console.log("onStepChanging");
            // Always allow previous step navigation
            if (currentIndex > newIndex) {
                return true;
            }
    
            // Validate the current step's form fields before moving forward
            return form.valid(); // Returns true if valid, false otherwise
        },
        // Final validation before form submission
        onFinishing: function (event, currentIndex) {
            return form.valid(); // Ensure the last step is valid before submitting
        },
        // On form submission
        onFinished: function (event, currentIndex) {
            // alert("Form submitted!");

            // Hide The Button and Form
            $(".actions a").hide();
            $(".form-row").hide();
            $(".checkbox-circle").hide();
            $(".form-term-conditions").hide();
            $(".form-error").hide();

            // Show the form is processing
            $(".form-process").show();
            
            grecaptcha.ready(() => {
                console.log('grecaptcha form is ready');
            });

            // Maintain the ux when submit using mobile size
            // if (window.innerWidth <= 768) {
                document.querySelector('#loanfit-form-process').scrollIntoView({ behavior: 'smooth' });
            // }
    
            submitLoanFitForm();
        }
    });

    $('.wizard > .steps li a').click(function(){
        if(form.valid()) {
            $(this).parent().addClass('checked');
            $(this).parent().prevAll().addClass('checked');
            $(this).parent().nextAll().removeClass('checked');
        }
    });
    // Custome Jquery Step Button
    $('.forward').click(function(){
    	$("#wizard").steps('next');
    })
    $('.backward').click(function(){
        $("#wizard").steps('previous');
    })
    // Select Dropdown
    $('html').click(function() {
        $('.select .dropdown').hide(); 
    });
    $('.select').click(function(event){
        event.stopPropagation();
    });
    $('.select .select-control').click(function(){
        $(this).parent().next().toggle();
    })    
    $('.select .dropdown li').click(function(){
        $(this).parent().toggle();
        var text = $(this).attr('rel');
        $(this).parent().prev().find('div').text(text);
    })
})

function submitLoanFitForm() {
    // Execute reCAPTCHA and get the token
    grecaptcha.execute('6LdmCn0nAAAAANC8dQDeC3bko97zlloPkuFcyP7_', { action: 'submit' }).then(function(token) {
        // Collect form data and trim inputs
        var formData = {
            fullName: $('#fullName').val().trim(),
            icNo: $('#icNo').val().trim(),
            age: $('#age').val().trim(),
            phone: $('#phone').val().trim(),
            email: $('#email').val().trim(),
            dependents: $('#dependents').val().trim(),
            employmentStatus: $('#employmentStatus').val().trim(),
            jobTitle: $('#jobTitle').val().trim(),
            workDuration: $('#workDuration').val().trim(),
            monthlyExpenses: $('#monthlyExpenses').val().trim(),
            monthlyIncome: $('#monthlyIncome').val().trim(),
            otherIncome: $('#otherIncome').val().trim(),
            loanType: $('#loanType').val().trim(),
            loanPurpose: $('#loanPurpose').val().trim(),
            loanAmount: $('#loanAmount').val().trim(),
            loanDuration: $('#loanDuration').val().trim(),
            // loanTermsCondition: $('#loanTermsCondition').is(':checked')
            recaptchaToken: token  // Add reCAPTCHA token
        };

        // Send data via AJAX to Backend
        $.ajax({
            url: 'https://leadsync.com.my/api/loanfit/loanfit-form',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),  // Serialize to JSON
            success: function (response) {
                // alert('Form submitted successfully!');
                $(".form-process").hide();
                $(".form-error").hide();
                $(".form-success").show();
            },
            error: function (error) {
                // alert('Error submitting form. Please try again.');
                console.log("error submit loanfit form", error);
                $(".actions a").show();
                $(".form-row").show();
                $(".checkbox-circle").show();
                $(".form-term-conditions").show();
                $(".form-process").hide();
                $(".form-error").show();
                // Maintain the ux when submit using mobile size
                if (window.innerWidth <= 768) {
                    document.querySelector('#loanfit-term-conditions').scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }).catch(function (error) {
        // Handle error in reCAPTCHA execution
        console.log('Error retrieving reCAPTCHA token:', error);
        // alert('Error with reCAPTCHA. Please try again.');
        $(".actions a").show();
        $(".form-row").show();
        $(".checkbox-circle").show();
        $(".form-term-conditions").show();
        $(".form-process").hide();
        $(".form-error").show();
        // Maintain the ux when submit using mobile size
        if (window.innerWidth <= 768) {
            document.querySelector('#loanfit-term-conditions').scrollIntoView({ behavior: 'smooth' });
        }
    });
};

$(document).ready(function() {
    // Get the select dropdown and input field
    const $employmentStatus = $('#employmentStatus');
    const $jobTitle = $('#jobTitle');
    // Listen for changes in the dropdown
    $employmentStatus.on('change', function() {
        if ($employmentStatus.val() === "Unemployed" || $employmentStatus.val() === "Student" || $employmentStatus.val() === "Retired" ) {
            var jobTitleValue = "";

            switch ($employmentStatus.val()) {
                case "Unemployed":
                    jobTitleValue = "Tidak Bekerja";
                    break;
                case "Student":
                    jobTitleValue = "Pelajar";
                    break;
                case "Retired":
                    jobTitleValue = "Sudah Bersara";
                    break;
                default:
                    jobTitleValue = "";
                    break;
            }

            $jobTitle.val(jobTitleValue);
        } else {
            $jobTitle.val("");
        }
    });
});