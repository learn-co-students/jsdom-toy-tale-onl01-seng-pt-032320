let addToy = false;
function getToys(){
  const toys = document.getElementById("toy-collection")
  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    for(lists of object){
      const divTag = document.createElement("div")
      divTag.class = 'card'
      const h2Tag = document.createElement("h2")
      h2Tag.innerText = lists.name 
      const imgTag = document.createElement("img")
      imgTag.src = lists.image
      const pTag = document.createElement("p")
      pTag.innerText = `${lists.likes} Likes `
      const buttonTag = document.createElement("button")
      buttonTag.class = 'like-btn'
      buttonTag.innerText = 'Like <3'
      buttonTag.id = lists.id 
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
  console.log(e.target.name.value);
  console.log(e.target.image.value)
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
  .then(response => response.json())
  .then(newToy => console.log(newToy));
  getToys()
  console.log("hello");
});


  const likeButton = document.getElementById("like-btn")
  likeButton.addEventListener('click', () => {
    fetch(`http://localhost:3000/toys/${likeButton.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": 7
      })
  });

});

});
