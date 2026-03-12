let musicURL=""
let photoURLs=[]

document.getElementById("musicFile").onchange=function(){

const file=this.files[0]

musicURL=URL.createObjectURL(file)

}

document.getElementById("photoFiles").onchange=function(){

const files=this.files

const preview=document.getElementById("preview")

preview.innerHTML=""

photoURLs=[]

for(let f of files){

const url=URL.createObjectURL(f)

photoURLs.push(url)

const img=document.createElement("img")

img.src=url

preview.appendChild(img)

}

}

function generateLink(){

const creator=document.getElementById("creatorName").value
const lover=document.getElementById("loverName").value

if(!creator || !lover || !musicURL || photoURLs.length===0){

alert("Fill all fields")

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

document.getElementById("linkBox").innerText=link

navigator.clipboard.writeText(link)

alert("Love link copied ❤️")

}
