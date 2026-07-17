import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase_url = "https://irdneuqbztqrtshdupql.supabase.co"
const publishable_key = "sb_publishable_H5eTy5PSQUb-mhrlEDZ4vw_YIR6TsSi"

const supabase = createClient(supabase_url, publishable_key)



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

// async function upload(file){

// const name=Date.now()+"-"+file.name;

// await supabase.storage
// .from("images")
// .upload(name,file);

// const {data}=supabase.storage
// .from("images")
// .getPublicUrl(name);

// return data.publicUrl;

// }
let imgUrl = "";

if (imageUploader) {
    let fileName = `${Date.now()}-${imageUploader.name}`;

    const { error: uploadError } = await supabase.storage
        .from("image-bucket")
        .upload(item, image);


    if (uploadError) {
        alert("Image upload failed")
        console.log(uploadError);
   
    }

    const { data:imageData } = supabase
        .storage
        .from("image-bucket")
        .getPublicUrl(fileName);

    imgUrl = imageData.publicUrl;
}





// Lost

document.getElementById("lostForm")
.addEventListener("submit",async(e)=>{

e.preventDefault();

const item=document.getElementById("lostItem").value;

const file=document.getElementById("lostImage").files[0];

const image=await upload(file);

await supabase
.from("lost table")
.insert({

item,
image

});

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