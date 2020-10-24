let addToy = false;
let divCollection = document.querySelector("#toy-collection")
let toyForm = document.querySelector(".container")


// toggle for adding a toy form
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener("submit", event => {
        event.preventDefault()
        createToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});




// show all toys
function allToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(obj => obj.forEach(toy => showToy(toy)))
}

allToys();


// displays toy
function showToy(toy) {
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let div = document.createElement('div')
  let p = document.createElement('p')
  let btn = document.createElement('button')

  h2.innerText = toy.name
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')
  div.setAttribute('class', 'card')
  p.innerText = `${toy.likes} likes`
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "Like <3"
  btn.addEventListener('click', (event) => like(event))

  div.append(h2, img, p, btn)

  divCollection.append(div)
}


// creates toys
function createToy(toy) {
  let toyObj = {
    "name": toy.name.value,
    "image": toy.image.value,
    "likes": 0
  }

  let formConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyObj)
  }

  fetch('http://localhost:3000/toys', formConfig)
    .then(resp => resp.json())
    .then(obj => {
      let newObj = showToy(obj)
      divCollection.append(newObj)
    })
}



// like a toy
function like(event) {

  event.preventDefault()
  let totalLikes = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ "likes": totalLikes })
  })
    .then(resp => resp.json())
    .then(obj => { event.target.previousElementSibling.innerText = `${totalLikes} likes` })
}