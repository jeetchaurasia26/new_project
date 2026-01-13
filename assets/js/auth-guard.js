import { supabase } from "./supabase.js";

export async function requireAuth() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    await supabase.auth.signOut();
    window.location.replace("../html/sign-in.html");
  }
}

export async function redirectIfLoggedIn() {
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    window.location.replace("../html/dashboard.html");
  }
}
