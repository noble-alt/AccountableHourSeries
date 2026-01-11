
function openBook() {
    document.getElementById('book').classList.add('is-open');
}

function closeBook() {
    document.getElementById('book').classList.remove('is-open');
}

document.getElementById('signUpForm').addEventListener('submit', function(event) {
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
                closeBook();
                messageDiv.textContent = '';
            }, 2000);
        }
    })
    .catch(error => {
        messageDiv.textContent = 'Error: ' + error;
    });
});

document.getElementById('signInForm').addEventListener('submit', function(event) {
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
            window.location.href = 'index.html'; // Redirect to a logged-in page
        }
    })
    .catch(error => {
        messageDiv.textContent = 'Error: ' + error;
    });
});
