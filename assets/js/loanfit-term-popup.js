// Terms and Conditions modal
// function popupTerm() {
//     var myModal = new bootstrap.Modal(document.getElementById('termsModal'));
//     myModal.show();
// }

// Terms of Use Modal
function showTermsOfUse() {
    // var termsModal = bootstrap.Modal.getInstance(document.getElementById('termsModal'));
    // termsModal.hide();

    var termsOfUseModal = new bootstrap.Modal(document.getElementById('termsOfUseModal'));
    termsOfUseModal.show(); // Show the Terms of Use modal
}

// Privacy Policy Modal
function showPrivacyPolicy() {
    var privacyPolicyModal = new bootstrap.Modal(document.getElementById('privacyPolicyModal'));
    privacyPolicyModal.show();
}

// Turn on this if necessary
// Reopen the main Terms and Conditions modal after the Terms of Use modal is closed
// document.getElementById('termsOfUseModal').addEventListener('hidden.bs.modal', function () {
//     var termsModal = new bootstrap.Modal(document.getElementById('termsModal'));
//     termsModal.show();
// });
