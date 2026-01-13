document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById('signup-btn');
    const signinBtn = document.getElementById('signin-btn');
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    const formHelper = document.getElementById('form-helper');
    const continueBtn = document.querySelector('.continue-btn');

    // Event listener for the 'sign up' button
    signupBtn.addEventListener('click', () => {
        // Set button states
        signupBtn.classList.add('active');
        signinBtn.classList.remove('active');

        // Show the sign-up form and hide the sign-in form
        signupForm.classList.remove('hidden');
        signinForm.classList.add('hidden');

        // Update helper text
        formHelper.textContent = 'Already have an account? Sign in!';
    });

    // Event listener for the 'Sign in' button
    signinBtn.addEventListener('click', () => {
        // Set button states
        signinBtn.classList.add('active');
        signupBtn.classList.remove('active');

        // Show the sign-in form and hide the sign-up form
        signinForm.classList.remove('hidden');
        signupForm.classList.add('hidden');

        // Update helper text
        formHelper.textContent = 'No Account, Sign up!!';
    });

    // Event listener for the 'Continue' button
    continueBtn.addEventListener('click', () => {
        const isSignUp = signupBtn.classList.contains('active');
        const form = isSignUp ? signupForm : signinForm;
        const endpoint = isSignUp ? '/signup' : '/signin';

        const inputs = form.querySelectorAll('input');
        const data = {};
        inputs.forEach(input => {
            data[input.name] = input.value;
        });

        // Basic validation
        if (isSignUp) {
            if (!data.fullname || !data.email || !data.password) {
                alert('Please fill in all fields for sign up.');
                return;
            }
        } else {
            if (!data.email || !data.password) {
                alert('Please fill in all fields for sign in.');
                return;
            }
        }

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            // Here you would typically handle the response, e.g., redirecting the user
            // or showing a success/error message.
            alert('Action was successful! (Check console for details)');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. (Check console for details)');
        });
    });
});
