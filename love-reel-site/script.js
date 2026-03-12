const SUPABASE_URL = "https://wakqdyivbsayqcgptvwt.supabase.co"
const SUPABASE_KEY = "sb_publishable_hmfrQQc8drLkV2hlN9c3pA_Vp9vC68h"

const supabase = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
)

let musicURL=""
let photoURLs=[]

async function uploadMusic(){

const file=document.getElementById("musicFile").files[0]

if(!file){
alert("Select music first")
return
}

const path="music/"+Date.now()+"_"+file.name

const {data,error}=await supabase.storage
.from("love-reels")
.upload(path,file)

if(error){
alert("Upload error")
return
}

musicURL=supabase.storage
.from("love-reels")
.getPublicUrl(path).data.publicUrl

document.getElementById("musicBar").style.width="100%"

checkReady()

}

async function uploadPhotos(){

const files=document.getElementById("photoFiles").files

for(let file of files){

const path="photos/"+Date.now()+"_"+file.name

await supabase.storage
.from("love-reels")
.upload(path,file)

const url=supabase.storage
.from("love-reels")
.getPublicUrl(path).data.publicUrl

photoURLs.push(url)

}

document.getElementById("photoBar").style.width="100%"

checkReady()

}

function checkReady(){

if(musicURL && photoURLs.length>0){

document.getElementById("generateBtn").style.display="block"

}

}

function generateLink(){

const creator=document.getElementById("creator").value

const lover=document.getElementById("lover").value

const id=Date.now().toString(36)

localStorage.setItem(id,JSON.stringify({

creator,
lover,
music:musicURL,
photos:photoURLs

}))

const link=window.location.origin+"/view.html?id="+id

document.getElementById("link").innerText=link

navigator.clipboard.writeText(link)

}
