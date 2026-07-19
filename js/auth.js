import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase_url = "https://irdneuqbztqrtshdupql.supabase.co"
const publishable_key = "sb_publishable_H5eTy5PSQUb-mhrlEDZ4vw_YIR6TsSi"

const supabase = createClient(supabase_url, publishable_key)


async function Signup(event) {
    event.preventDefault();

    let username = document.getElementById("signupUsername").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value;

    if (!username || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp(
  {
    email: email,
    password: password,
    options: {
      data: {
        first_name: username,
        email: email,
        role:"user"
      }
    }
  }
)

        console.log("Signup:", data);
if (error) {
    alert(error.message);
    return;
}
        alert("Account Created Successfully!");

        document.getElementById("signupFormNew").reset();

        // switch to login view
      
window.location.href = "./dashboard.html";

    } catch (error) {
        console.log(error);
    }
}



//login function//
async function login(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmailNew").value.trim();
    let password = document.getElementById("loginPasswordNew").value.trim();

    if (!email || !password) {
        alert("Enter email & password");
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({email,password });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Login Successful!");

        document.getElementById("loginFormNew").reset();

        window.location.href = "./dashboard.html";

    } catch (error) {
        console.log(error);
    }
}



  

//events//
document.getElementById("signupFormNew").addEventListener("submit", Signup);
document.getElementById("loginFormNew").addEventListener("submit", login);



const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)
  
    if (event === 'INITIAL_SESSION') {
     if(!session){
        // alert("create account first")
     }
      console.log("session check", session);

    } else if (event === 'SIGNED_IN') {
      alert("user signed in successfully")
  console.log("user signed in");
    }
  })
  
async function signUpWithGoogle(){
try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://127.0.0.1:5501/dashboard.html'
      }
    })
  } catch (error) {
    console.log(error);
  }
}
window.signUpWithGoogle = signUpWithGoogle  