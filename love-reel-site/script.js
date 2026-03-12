const params = new URLSearchParams(window.location.search)

const creator = params.get("creator")
const lover = params.get("lover")

if(creator){

document.getElementById("creatorPage").style.display="none"

document.getElementById("page1").style.display="block"

document.getElementById("creatorText").innerText =
"Website Created By " + creator + " ❤️"

}

document.getElementById("generateBtn").addEventListener("click", function(){

const name = document.getElementById("nameInput").value
const loverName = document.getElementById("loverInput").value

const musicFile = document.getElementById("music").files[0]
const photos = document.getElementById("photos").files

if(!name || !loverName || !musicFile || photos.length===0){

alert("Please fill all fields ❤️")

return

}

const link =
window.location.origin +
"?creator=" + encodeURIComponent(name) +
"&lover=" + encodeURIComponent(loverName)

document.getElementById("generatedLink").innerText = link

navigator.clipboard.writeText(link)

alert("Love link created & copied ❤️")

})

function showPage(n){

document.querySelectorAll(".storyPage").forEach(p=>p.style.display="none")

let page=document.getElementById("page"+n)

if(page) page.style.display="block"

}

function playMusic(){

let file=document.getElementById("music").files[0]

if(!file){

alert("Upload music first 🎵")

return

}

let song=document.getElementById("song")

song.src=URL.createObjectURL(file)

song.play()

}
