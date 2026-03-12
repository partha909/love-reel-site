const SUPABASE_URL = "https://wakqdyivbsayqcgptvwt.supabase.co"
const SUPABASE_KEY = "sb_publishable_hmfrQQc8drLkV2hlN9c3pA_Vp9vC68h"

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

let musicURL=""
let photoURLs=[]

// music upload
document.getElementById("uploadMusic").addEventListener("click", async ()=>{

const file=document.getElementById("musicFile").files[0]
if(!file){
alert("Select music")
return
}

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

})

// photos upload
document.getElementById("uploadPhotos").addEventListener("click", async ()=>{

const files=document.getElementById("photoFiles").files
if(files.length===0){
alert("Select photos")
return
}

let count=0

for(const file of files){

const path="photos/"+Date.now()+"_"+file.name

await client.storage
.from("love-reels")
.upload(path,file)

const url=client.storage
.from("love-reels")
.getPublicUrl(path).data.publicUrl

photoURLs.push(url)

count++

document.getElementById("photoBar").style.width =
Math.round((count/files.length)*100)+"%"

}

checkReady()

})

function checkReady(){
if(musicURL && photoURLs.length>0){
document.getElementById("generateBtn").disabled=false
}
}

// generate link
document.getElementById("generateBtn").addEventListener("click", ()=>{

const creator=document.getElementById("creator").value
const lover=document.getElementById("lover").value

if(!creator || !lover){
alert("Enter names")
return
}

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

})
