// assets/js/verify-otp.js
import { supabase } from "./supabase.js";

const otpForm = document.getElementById("otp-form");

otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("auth_email");
  const token = document.getElementById("otp").value;

  if (!email) {
    console.warn("No auth_email found in localStorage");
    alert("Session expired. Please sign in again.");
    return window.location.href = "sign-in.html";
  }

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email"
  });

  if (error) return alert("Invalid or expired OTP");

  localStorage.removeItem("auth_email");
  console.log("OTP Verified! Determining redirect...");

  if (email === "info@onelayer.in") {
    window.location.href = "admin/dashboard.html";
  } else {
    window.location.href = "dashboard.html";
  }
});
