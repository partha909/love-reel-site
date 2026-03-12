let musicUploaded=false
let photosUploaded=false

let musicURL=""
let photoURLs=[]

// music upload

document.getElementById("uploadMusic").onclick=()=>{

const file=document.getElementById("musicFile").files[0]

if(!file){
alert("Choose music")
return
}

const bar=document.getElementById("musicBar")

let p=0

const interval=setInterval(()=>{

p+=10

bar.style.width=p+"%"

if(p>=100){

clearInterval(interval)

musicUploaded=true

musicURL=URL.createObjectURL(file)

checkReady()

}

},200)

}

// photo upload

document.getElementById("uploadPhotos").onclick=()=>{

const files=document.getElementById("photoFiles").files

if(files.length===0){
alert("Choose photos")
return
}

const bar=document.getElementById("photoBar")

let p=0

const interval=setInterval(()=>{

p+=10

bar.style.width=p+"%"

if(p>=100){

clearInterval(interval)

photosUploaded=true

photoURLs=[]

const preview=document.getElementById("photoPreview")

preview.innerHTML=""

for(let f of files){

const url=URL.createObjectURL(f)

photoURLs.push(url)

const img=document.createElement("img")

img.src=url

preview.appendChild(img)

}

checkReady()

}

},200)

}

// enable generate

function checkReady(){

if(musicUploaded && photosUploaded){

document.getElementById("generateLink").style.display="block"

}

}

// generate link

document.getElementById("generateLink").onclick=()=>{

const creator=document.getElementById("creatorName").value

const lover=document.getElementById("loverName").value

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

document.getElementById("linkBox").innerText=link

navigator.clipboard.writeText(link)

alert("Love link copied ❤️")

}
