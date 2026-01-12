
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const messageEl = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.email.value;
        const password = form.password.value;

        messageEl.textContent = '';
        messageEl.style.color = 'inherit';

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                messageEl.textContent = 'Signup successful! You can now log in.';
                messageEl.style.color = '#28a745';
                form.reset();
            } else {
                messageEl.textContent = data.message || 'An error occurred.';
                messageEl.style.color = '#dc3545';
            }
        } catch (error) {
            console.error('Fetch error:', error);
            messageEl.textContent = 'Could not connect to the server.';
            messageEl.style.color = '#dc3545';
        }
    });
});
