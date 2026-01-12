document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('signUpEmail').value;
            const password = document.getElementById('signUpPassword').value;
            const messageDiv = document.getElementById('signUpMessage');

            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, email, password })
            })
            .then(response => response.json())
            .then(data => {
                messageDiv.textContent = data.message;
                if (data.message === 'User created successfully') {
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 2000);
                }
            })
            .catch(error => {
                messageDiv.textContent = 'Error: ' + error;
            });
        });
    }

    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('signInEmail').value;
            const password = document.getElementById('signInPassword').value;
            const messageDiv = document.getElementById('signInMessage');

            fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                messageDiv.textContent = data.message;
                if (data.message === 'Sign-in successful') {
                    window.location.href = '/index.html'; // Redirect to a logged-in page
                }
            })
            .catch(error => {
                messageDiv.textContent = 'Error: ' + error;
            });
        });
    }
});
j