import { supabase } from "./supabase.js";

export async function requireAuth() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    await supabase.auth.signOut();
    window.location.replace("sign-in.html");
  }
}

export async function redirectIfLoggedIn() {
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    if (data.user.email === "info@onelayer.in") {
      window.location.replace("admin/dashboard.html");
    } else {
      window.location.replace("dashboard.html");
    }
  }
}
