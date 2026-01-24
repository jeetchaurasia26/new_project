// assets/js/admin-guard.js
import { supabase } from "./supabase.js";

/**
 * Ensures the logged-in user is the specific admin: info@onelayer.in
 * If not, redirects to the standard client dashboard or sign-in page.
 */
export async function requireAdmin() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.warn("No authenticated user found. Redirecting to sign-in.");
        window.location.replace("../html/sign-in.html");
        return;
    }

    if (user.email !== "info@onelayer.in") {
        console.error("Access Denied: User is not authorized for admin access.");
        alert("Access Denied: You do not have permission to view this page.");
        window.location.replace("../html/dashboard.html");
        return;
    }

    console.log("Admin access granted for:", user.email);
    return user;
}

/**
 * Check if the user is admin without force redirect (useful for conditional UI)
 */
export async function isAdmin() {
    const { data: { user } } = await supabase.auth.getUser();
    return user && user.email === "info@onelayer.in";
}
