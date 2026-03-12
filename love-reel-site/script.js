document.getElementById("generateBtn").addEventListener("click", function(){

const creator = document.getElementById("nameInput").value
const lover = document.getElementById("loverInput").value

const musicFile = document.getElementById("music").files[0]
const photos = document.getElementById("photos").files

if(!creator || !lover || !musicFile || photos.length === 0){

alert("Please fill all fields ❤️")

return

}

const id = Date.now().toString(36)

const link =
window.location.origin +
"/view.html?id=" + id +
"&creator=" + encodeURIComponent(creator) +
"&lover=" + encodeURIComponent(lover)

document.getElementById("generatedLink").innerText = link

navigator.clipboard.writeText(link)

alert("Love link created & copied ❤️")

})
