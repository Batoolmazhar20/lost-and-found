import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase_url = "https://irdneuqbztqrtshdupql.supabase.co"
const publishable_key = "sb_publishable_H5eTy5PSQUb-mhrlEDZ4vw_YIR6TsSi"

const supabase = createClient(supabase_url, publishable_key)

let userID;
let username;
let role;
let email;



async function user() {
    try {
        const { data: { user },error } = await supabase.auth.getUser()



    // console.log(user.email);
    email=user.email
    userID = user.id;
    username= user.user_metadata.first_name;
    role=user.user_metadata.role
    } catch (error) {
        console.log(error)
    }
}

user()

async function item(){
try {
    const { data, error } = await supabase
    .from('lost table')
    .select("*")
if (error) {
  console.error(error)
  return
}
} catch (error) {
    console.log(error)
}
}
item()

async function  getLostItems() {
    try {
        const { data, error } = await supabase
    .from("lost table")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  lostItems(data);
    } catch (error) {
        error
    }
}


async function lostItems(items) {
    const container = document.getElementById("lostItems")
    container.innerHTML=""

    items.forEach((item) => {
        container.innerHTML +=`
        <div class="card p-3 mb-3">
        <img src="${item.image}" width="200">
        <h4>${item.item}</h4>
      </div>
        `
    });
}
// Toggle

const lostBtn=document.getElementById("lostBtn");
const foundBtn=document.getElementById("foundBtn");

const lostSection=document.getElementById("lostSection");
const foundSection=document.getElementById("foundSection");

lostBtn.onclick=()=>{

lostBtn.classList.add("active");
foundBtn.classList.remove("active");

lostSection.classList.remove("hide");
foundSection.classList.add("hide");

}

foundBtn.onclick=()=>{

foundBtn.classList.add("active");
lostBtn.classList.remove("active");

foundSection.classList.remove("hide");
lostSection.classList.add("hide");

}

// Image Preview

function preview(input,img){

input.addEventListener("change",()=>{

const file=input.files[0];

if(file){

img.src=URL.createObjectURL(file);
img.style.display="block";

}

});

}

preview(
document.getElementById("lostImage"),
document.getElementById("lostPreview")
);

preview(
document.getElementById("foundImage"),
document.getElementById("foundPreview")
);

// Upload Image

async function upload(file){

const name=Date.now()+"-"+file.name;

await supabase.storage
.from("image")
.upload(name,file);


const {data}=supabase.storage
.from("image")
.getPublicUrl(name);

return data.publicUrl;

}





// Lost

document.getElementById("lostForm")
.addEventListener("submit",async(e)=>{

e.preventDefault();

await user()

const item=document.getElementById("lostItem").value;

const file=document.getElementById("lostImage").files[0];

const image=await upload(file);

console.log("User ID:", userID);

const { error } = await supabase

.from("lost table")
.insert({
item,
image,
user_id: userID
});
if(error){ 
    console.log(error)
    return;
}
await getLostItems()
alert("Lost Item Added");

e.target.reset();

document.getElementById("lostPreview").style.display="none";

});

// Found

document.getElementById("foundForm")
.addEventListener("submit",async(e)=>{

e.preventDefault();

const item=document.getElementById("foundItem").value;

const file=document.getElementById("foundImage").files[0];

const image=await upload(file);

await supabase
.from("found table")
.insert({

item,
image

});

alert("Found Item Added");

e.target.reset();

document.getElementById("foundPreview").style.display="none";

});

// Logout

document
.getElementById("logoutBtn")
.onclick=async()=>{

await supabase.auth.signOut();

location.href="index.html";

};

getLostItems();