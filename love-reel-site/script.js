const supabaseUrl = "https://wakqdyivbsayqcgptvwt.supabase.co"
const supabaseKey = "sb_publishable_hmfrQQc8drLkV2hlN9c3pA_Vp9vC68h"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

document.getElementById("generateBtn").addEventListener("click", async function(){

const creator = document.getElementById("nameInput").value
const lover = document.getElementById("loverInput").value

const musicFile = document.getElementById("music").files[0]
const photoFiles = document.getElementById("photos").files

if(!creator || !lover || !musicFile || photoFiles.length==0){
alert("Fill all fields ❤️")
return
}

const id = Date.now().toString(36)

// upload music
await supabaseClient.storage
.from("love-files")
.upload("music/"+id+".mp3", musicFile)

// upload photos
let photoUrls = []

for(const file of photoFiles){

const path = "photos/"+id+"_"+file.name

await supabaseClient.storage
.from("love-files")
.upload(path, file)

const { data } = supabaseClient.storage
.from("love-files")
.getPublicUrl(path)

photoUrls.push(data.publicUrl)

}

// save database
await supabaseClient.from("reels").insert({

id:id,
creator:creator,
lover:lover,
music:"music/"+id+".mp3",
photos:photoUrls

})

const link =
window.location.origin +
"/view.html?id=" + id

document.getElementById("generatedLink").innerText = link

navigator.clipboard.writeText(link)

alert("Love link created ❤️")

})
