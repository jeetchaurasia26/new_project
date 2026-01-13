// assets/js/dashboard.js

import { supabase } from "./supabase.js";
import { requireAuth } from "./auth-guard.js";

// Page ready
document.addEventListener("DOMContentLoaded", async () => {
  
  // 1️⃣ Protect Page
  await requireAuth();

  // 2️⃣ Load Dashboard Data (placeholder)
  await loadDashboard();

  // 3️⃣ Logout Button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await supabase.auth.signOut();
      window.location.replace("sign-in.html");
    });
  }

  // 4️⃣ Auto-logout on tab close / refresh
  window.addEventListener("beforeunload", async () => {
    await supabase.auth.signOut();
  });

  // 5️⃣ Auto-logout on tab switch / minimize
  document.addEventListener("visibilitychange", async () => {
    if (document.hidden) {
      await supabase.auth.signOut();
      window.location.replace("sign-in.html");
    }
  });

});

// 📌 Dummy stats loader (will replace with real DB later)
async function loadDashboard() {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    // Placeholder values (replace later)
    document.getElementById("stat-projects").innerText = "0";
    document.getElementById("stat-reports").innerText = "0";
    document.getElementById("stat-invoices").innerText = "₹0";

  } catch (err) {
    console.error("Dashboard load error:", err);
  }
}
