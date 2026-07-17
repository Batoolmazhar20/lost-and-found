import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase_url = "https://irdneuqbztqrtshdupql.supabase.co"
const publishable_key = "sb_publishable_H5eTy5PSQUb-mhrlEDZ4vw_YIR6TsSi"

const supabase = createClient(supabase_url, publishable_key)


// Check login
const { data: { user } } = await supabase.auth.getUser();

if (!user) {
    window.location.href = "index.html";
}

// Show username
document.getElementById("username").textContent =
    user.user_metadata.username || user.email;

// Lost Items Count
const { count: lost } = await supabase
.from("lost table")
.select("*", { count: "exact", head: true });

document.getElementById("lostCount").textContent = lost || 0;

// Found Items Count
const { count: found } = await supabase
.from("found table")
.select("*", { count: "exact", head: true });

document.getElementById("foundCount").textContent = found || 0;

// Total Users (optional)
document.getElementById("userCount").textContent = "--";

// Logout
window.logout = async () => {

    await supabase.auth.signOut();

    window.location.href = "index.html";

};