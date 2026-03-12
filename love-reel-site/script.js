document.getElementById("generateBtn").addEventListener("click", function(){

const creator = document.getElementById("nameInput").value
const lover = document.getElementById("loverInput").value

const musicFile = document.getElementById("music").files[0]
const photoFiles = document.getElementById("photos").files

if(!creator || !lover || !musicFile || photoFiles.length==0){
alert("Fill all fields ❤️")
return
}

const readerMusic = new FileReader()

readerMusic.onload=function(){

localStorage.setItem("musicData",readerMusic.result)

}

readerMusic.readAsDataURL(musicFile)

let photos=[]

Array.from(photoFiles).forEach(file=>{

const reader=new FileReader()

reader.onload=function(){

photos.push(reader.result)

localStorage.setItem("photoData",JSON.stringify(photos))

}

reader.readAsDataURL(file)

})

const link =
window.location.origin +
"/view.html?creator=" + encodeURIComponent(creator)

document.getElementById("generatedLink").innerText = link

navigator.clipboard.writeText(link)

alert("Love link copied ❤️")

})
