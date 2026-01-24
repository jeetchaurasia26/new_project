// assets/js/contact-form.js
import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.get-in-touch form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form values
            const formData = {
                full_name: document.getElementById('fullName').value.trim(),
                business_nam: document.getElementById('businessName').value.trim(),
                work_email: document.getElementById('workEmail').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                website: document.getElementById('website').value.trim() || null,
                business_stag: document.getElementById('businessStage').value,
                infrastructure: document.getElementById('infrastructure').value,
                budget: document.getElementById('budget').value,
                challenge: document.getElementById('challenge').value.trim()
            };

            // Validate required fields
            if (!formData.full_name || !formData.business_nam || !formData.work_email ||
                !formData.phone || !formData.business_stag || !formData.infrastructure ||
                !formData.budget || !formData.challenge) {
                alert('Please fill in all required fields.');
                return;
            }

            // Disable submit button to prevent double submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.querySelector('.btn-text').textContent;
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').textContent = 'Submitting...';

            try {
                // Insert data into Supabase
                const { data, error } = await supabase
                    .from('infrastructure_leads')
                    .insert([formData]);

                if (error) {
                    throw error;
                }

                // Success message
                alert('Thank you! Your infrastructure call request has been submitted successfully. We will get back to you within 24 business hours.');

                // Reset form
                contactForm.reset();

            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your request. Please try again or contact us directly at info@onelayer.in');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = originalBtnText;
            }
        });
    }
});
