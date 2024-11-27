document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                // Stocker le token dans localStorage
                localStorage.setItem('token', data.token);
                // Rediriger vers la page principale
                window.location.href = '/dashboard';
            } else {
                throw new Error('Échec de la connexion');
            }
        } catch (error) {
            alert('Erreur de connexion: ' + error.message);
        }
    });

    // Animation séquentielle des éléments du formulaire
    const formElements = document.querySelectorAll('#loginForm > *');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}); 