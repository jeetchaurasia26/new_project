// ===============================
// Supabase Configuration
// ===============================
const SUPABASE_URL = "https://hydtchbejefpsrcbcvta.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5ZHRjaGJlamVmcHNyY2JjdnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MjExNjAsImV4cCI6MjA4MzM5NzE2MH0.-02P-evbPRxhOyeRzJNU_QX5XkOOU91ofbM9U3GaK90";

const supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===============================
// HARD BLOCK native submit
// ===============================
window.addEventListener(
  "submit",
  (e) => {
    const form = e.target;
    if (form && form.tagName === "FORM") {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  },
  true // capture phase
);

// ===============================
// Form Handling
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const buttonText = submitButton.querySelector(".btn-text");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    submitButton.disabled = true;
    buttonText.textContent = "Submitting...";

    const payload = {
      full_name: document.getElementById("fullName")?.value.trim(),
      business_name: document.getElementById("businessName")?.value.trim(),
      work_email: document.getElementById("workEmail")?.value.trim(),
      phone: document.getElementById("phone")?.value.trim(),
      website: document.getElementById("website")?.value.trim() || null,
      business_stage: document.getElementById("businessStage")?.value,
      infrastructure: document.getElementById("infrastructure")?.value,
      budget: document.getElementById("budget")?.value,
      challenge: document.getElementById("challenge")?.value.trim(),
    };

    try {
      const { error } = await supabase
        .from("infrastructure_leads")
        .insert([payload]);

      if (error) {
        console.error("Supabase error:", error);
        alert("Something went wrong. Please try again.");
        return;
      }

      alert("Thank you! Our team will contact you within 24 business hours.");
      form.reset();
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error. Please refresh and try again.");
    } finally {
      submitButton.disabled = false;
      buttonText.textContent = "Book Infrastructure Call";
    }
  });
});
