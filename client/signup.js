document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const messageEl = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = form.username.value;
        const password = form.password.value;

        messageEl.textContent = 'Processing...';
        messageEl.style.color = 'inherit';

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                messageEl.textContent = 'Signup successful! Redirecting to login...';
                messageEl.style.color = '#28a745'; // Green for success
                form.reset();
                setTimeout(() => {
                    window.location.href = 'login.html'; // Redirect to login page
                }, 2000);
            } else {
                messageEl.textContent = data.message || 'An error occurred during signup.';
                messageEl.style.color = '#dc3545'; // Red for error
            }
        } catch (error) {
            console.error('Signup fetch error:', error);
            messageEl.textContent = 'Could not connect to the server. Please try again later.';
            messageEl.style.color = '#dc3545';
        }
    });
});