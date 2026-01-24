// assets/js/home-contact-form.js
import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', function () {
    const homeContactForm = document.querySelector('.get-in-touch form');

    if (homeContactForm) {
        homeContactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form values
            const formData = {
                name: document.getElementById('homeName').value.trim(),
                email: document.getElementById('homeEmail').value.trim(),
                message: document.getElementById('homeMessage').value.trim()
            };

            // Validate required fields
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all fields.');
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Disable submit button to prevent double submission
            const submitBtn = homeContactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.querySelector('.btn-text').textContent;
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').textContent = 'Sending...';

            try {
                // Insert data into Supabase
                const { data, error } = await supabase
                    .from('home_contact_leads')
                    .insert([formData]);

                if (error) {
                    throw error;
                }

                // Success message
                alert('Thank you for reaching out! We will get back to you soon.');

                // Reset form
                homeContactForm.reset();

            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error sending your message. Please try again or contact us directly at info@onelayer.in');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = originalBtnText;
            }
        });
    }
});
