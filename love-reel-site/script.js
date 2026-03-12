const supabase = window.supabase.createClient(
"https://wakqdyivbsayqcgptvwt.supabase.co",
"sb_publishable_hmfrQQc8drLkV2hlN9c3pA_Vp9vC68h"
)

let musicURL=""
let photoURLs=[]

async function uploadMusic(){

const file=document.getElementById("music").files[0]

if(!file){
alert("Select music first")
return
}

const path="music/"+Date.now()+"_"+file.name

await supabase.storage
.from("love-reels")
.upload(path,file)

musicURL=supabase.storage
.from("love-reels")
.getPublicUrl(path).data.publicUrl

checkReady()

}

async function uploadPhotos(){

const files=document.getElementById("photos").files

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

const data={creator,lover,music:musicURL,photos:photoURLs}

const id=Date.now().toString(36)

localStorage.setItem(id,JSON.stringify(data))

const link=window.location.origin+"/view.html?id="+id

document.getElementById("result").innerText=link

navigator.clipboard.writeText(link)

}
