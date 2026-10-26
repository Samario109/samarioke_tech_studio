const EMAILJS_CONFIG = {
    publicKey: 'rM7ahN4cUiw4e2OSs',
    serviceId: 'service_fkn2n8x',
    templateId: 'template_fooplns'
};

// Theme switcher
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = themeToggleBtn?.querySelector('i');

function applyTheme(isLightMode) {
    document.body.classList.toggle('light-mode', isLightMode);
    if (themeIcon) {
        themeIcon.className = isLightMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        themeToggleBtn.setAttribute('aria-label', isLightMode ? 'Switch to dark theme' : 'Switch to light theme');
    }
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

if (themeToggleBtn) {
    applyTheme(localStorage.getItem('theme') === 'light');
    themeToggleBtn.addEventListener('click', () => {
        applyTheme(!document.body.classList.contains('light-mode'));
    });
}

// Pre-fill contact details when arriving from a service or portfolio link.
const contactMessage = document.getElementById('message');
if (contactMessage) {
    const query = new URLSearchParams(window.location.search);
    const project = query.get('project');
    const service = query.get('service');
    const plan = query.get('plan');
    const selectedItem = project || service || plan;
    if (selectedItem) {
        contactMessage.value = `I'm interested in ${selectedItem}. `;
    }
}

// EmailJS uses its browser-safe public key; never place a private key here.
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const feedback = document.getElementById('formFeedback');

if (contactForm && submitBtn && feedback) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const isConfigured = Object.values(EMAILJS_CONFIG).every(
            value => value && !value.startsWith('YOUR_')
        );

        if (!isConfigured) {
            feedback.textContent = 'Email delivery is not configured yet. Please use the WhatsApp or email links for now.';
            feedback.classList.add('error');
            return;
        }

        if (!window.emailjs) {
            feedback.textContent = 'The email service could not be loaded. Please try again or contact us directly.';
            feedback.classList.add('error');
            return;
        }

        const originalButton = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i> Sending...';
        feedback.textContent = '';
        feedback.classList.remove('error');

        try {
            await window.emailjs.sendForm(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                contactForm,
                { publicKey: EMAILJS_CONFIG.publicKey }
            );
            contactForm.reset();
            feedback.textContent = 'Thanks! Your inquiry was sent successfully. We’ll be in touch soon.';
        } catch (error) {
            console.error('EmailJS form submission failed:', error);
            feedback.textContent = 'Sorry, your message could not be sent. Please try WhatsApp or email us directly.';
            feedback.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalButton;
        }
    });
}
