// assets/js/auth.js
import { supabase } from "./supabase.js";

/* =========================
   SIGNUP (OTP)
========================= */
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const full_name = document.getElementById("full_name").value;
    const company_name = document.getElementById("company_name").value;
    const phone = document.getElementById("phone").value;
    const whatsapp = document.getElementById("whatsapp").value;

    // Disable submit button
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending OTP...';

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: { full_name, company_name, phone, whatsapp }
        }
      });

      if (error) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return alert(error.message);
      }

      // Store email and redirect
      localStorage.setItem("auth_email", email);
      console.log("LocalStorage set: auth_email =", localStorage.getItem("auth_email"));
      alert('OTP sent to your email! Redirecting to verification page...');

      // Use relative path for universal compatibility (local and server)
      const redirectUrl = "verify-otp.html";
      console.log("Redirecting to:", redirectUrl);
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 500);

    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      alert('An error occurred. Please try again.');
      console.error(err);
    }
  });
}

/* =========================
   LOGIN (OTP)
========================= */
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login_email").value;

    // Disable submit button
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending OTP...';

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false }
      });

      if (error) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return alert(error.message);
      }

      // Store email and redirect
      localStorage.setItem("auth_email", email);
      console.log("LocalStorage set: auth_email =", localStorage.getItem("auth_email"));
      alert('OTP sent to your email! Redirecting to verification page...');

      // Use relative path for universal compatibility (local and server)
      const redirectUrl = "verify-otp.html";
      console.log("Redirecting to:", redirectUrl);
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 500);

    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      alert('An error occurred. Please try again.');
      console.error(err);
    }
  });
}
