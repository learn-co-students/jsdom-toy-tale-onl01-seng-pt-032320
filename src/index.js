let addToy = false;
function getToys(){
  const toys = document.getElementById("toy-collection")
  toys.innerHTML = ""
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(function(object) {
    for(lists of object){
      console.log(lists);
      const divTag = document.createElement("div")
      divTag.class = 'card'
      divTag.id = lists.id 
      const h2Tag = document.createElement("h2")
      h2Tag.innerText = lists.name 
      const imgTag = document.createElement("img")
      imgTag.src = lists.image
      const pTag = document.createElement("p")
      pTag.innerText = `${lists.likes} Likes`
      console.log(pTag.innerText);
      const buttonTag = document.createElement("button")
      buttonTag.class = 'like-btn'
      buttonTag.innerText = 'Like <3'
      buttonTag.id = lists.id 
      buttonTag.addEventListener('click', (event) => {
        let toyLikes = parseInt(pTag.innerText.split(" ")[0])
         const toyId = event.target.id
        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "likes": toyLikes+1
          })
      });
      getToys()
    })
      divTag.appendChild(h2Tag)
      divTag.appendChild(imgTag)
      divTag.appendChild(pTag)
      divTag.appendChild(buttonTag)
      toys.appendChild(divTag)
    }
  })
}
document.addEventListener("DOMContentLoaded", () => {
  getToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form")
  addBtn.addEventListener("click", () => {
    toyFormContainer.style.display = "block"
  });

toyForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const containerDiv = document.getElementById("toy-collection");
  const innerDivs = containerDiv.getElementsByTagName("DIV");
  for(let i=0; i<innerDivs.length; i++)
  {
     const valueName = innerDivs[i].querySelector("h2").innerText
     const valueImage = innerDivs[i].querySelector("IMG").src
     if (e.target.name.value === valueName || e.target.image.value === valueImage) {
        addToy = true
     }
  }

 if (addToy === true) {
   console.log("The toy was already added");
  }
     else {
      fetch("http://localhost:3000/toys",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": e.target.name.value,
          "image": e.target.image.value,
          "likes": 0
        })
      })
    }
  })
  getToys()
  
})
 

