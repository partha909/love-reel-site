document.getElementById("generateBtn").addEventListener("click", function(){

const creator = document.getElementById("nameInput").value
const lover = document.getElementById("loverInput").value

if(!creator || !lover){
alert("Please enter names ❤️")
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

alert("Love link copied ❤️")

})
