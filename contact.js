document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basis-Validierung
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showStatus('Bitte fülle alle Pflichtfelder aus.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showStatus('Bitte gib eine gültige E-Mail-Adresse ein.', 'error');
            return;
        }

        // Sende-Button deaktivieren und Lade-Animation zeigen
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = 'Wird gesendet...';

        // Formspree Formular senden
        fetch('https://formspree.io/f/mrbpbalw', {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showStatus('Vielen Dank für deine Nachricht! Ich werde mich schnellstmöglich bei dir melden.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Fehler beim Senden der Nachricht');
            }
        })
        .catch(error => {
            showStatus('Es gab einen Fehler beim Senden der Nachricht. Bitte versuche es später erneut.', 'error');
        })
        .finally(() => {
            // Button wieder aktivieren
            submitButton.disabled = false;
            submitButton.innerHTML = 'Nachricht senden';
        });
    });

    // Hilfsfunktionen
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        formStatus.style.display = 'block';

        // Status nach 5 Sekunden ausblenden bei Erfolg
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
});