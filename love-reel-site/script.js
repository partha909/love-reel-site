const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL"
const SUPABASE_KEY = "PASTE_YOUR_PUBLIC_KEY"

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
)

let uploadedMusic=""
let uploadedPhotos=[]

document.getElementById("uploadBtn").addEventListener("click", async ()=>{

const musicFile=document.getElementById("music").files[0]
const photoFiles=document.getElementById("photos").files

if(!musicFile || photoFiles.length===0){

alert("Choose music & photos first")

return

}

document.getElementById("uploadStatus").innerText="Uploading..."

try{

// upload music
const musicName="music_"+Date.now()+"_"+musicFile.name

await supabase.storage
.from("love-reels")
.upload(musicName,musicFile)

uploadedMusic=
supabase.storage.from("love-reels")
.getPublicUrl(musicName).data.publicUrl

// upload photos
uploadedPhotos=[]

for(let file of photoFiles){

const photoName="photo_"+Date.now()+"_"+file.name

await supabase.storage
.from("love-reels")
.upload(photoName,file)

const url=
supabase.storage.from("love-reels")
.getPublicUrl(photoName).data.publicUrl

uploadedPhotos.push(url)

}

document.getElementById("uploadStatus").innerText="Upload Complete ✅"

}catch(e){

console.error(e)

alert("Upload failed")

}

})

document.getElementById("generateBtn").addEventListener("click",()=>{

const creator=document.getElementById("nameInput").value
const lover=document.getElementById("loverInput").value

if(!creator || !lover){

alert("Enter names")

return

}

if(!uploadedMusic || uploadedPhotos.length===0){

alert("Upload files first")

return

}

const id=Date.now().toString(36)

localStorage.setItem(id,JSON.stringify({

creator,
lover,
music:uploadedMusic,
photos:uploadedPhotos

}))

const link=
window.location.origin+
"/view.html?id="+id

document.getElementById("generatedLink").innerText=link

navigator.clipboard.writeText(link)

alert("Love link copied ❤️")

})
