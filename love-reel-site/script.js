const SUPABASE_URL = "https://wakqdyivbsayqcgptvwt.supabase.co"
const SUPABASE_KEY = "sb_publishable_hmfrQQc8drLkV2hlN9c3pA_Vp9vC68h"

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

let musicURL=""
let photoURLs=[]

// Upload music
document.getElementById("uploadMusic").onclick = async () => {

const file=document.getElementById("musicFile").files[0]
if(!file) return alert("Select music")

const path="music/"+Date.now()+"_"+file.name

const {error}=await client.storage
.from("love-reels")
.upload(path,file)

if(error){
alert(error.message)
return
}

musicURL=client.storage
.from("love-reels")
.getPublicUrl(path).data.publicUrl

document.getElementById("musicBar").style.width="100%"

checkReady()

}

// Upload photos
document.getElementById("uploadPhotos").onclick = async () => {

const files=document.getElementById("photoFiles").files
if(files.length===0) return alert("Select photos")

for(const file of files){

const path="photos/"+Date.now()+"_"+file.name

await client.storage
.from("love-reels")
.upload(path,file)

const url=client.storage
.from("love-reels")
.getPublicUrl(path).data.publicUrl

photoURLs.push(url)

}

document.getElementById("photoBar").style.width="100%"

checkReady()

}

function checkReady(){
if(musicURL && photoURLs.length>0){
document.getElementById("generateBtn").disabled=false
}
}

// Generate link
document.getElementById("generateBtn").onclick=()=>{

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

document.getElementById("result").innerText=link

navigator.clipboard.writeText(link)

}
