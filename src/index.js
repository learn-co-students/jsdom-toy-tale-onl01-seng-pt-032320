let addToy = false;
let toyContainer = document.getElementById("toy-collection")
let form = document.querySelector('.add-toy-form')

const toyURL = "http://localhost:3000/toys"

fetchToys()

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  form.addEventListener('submit', submitNewToy);
});

function fetchToys() {
  return fetch(toyURL)
    .then((resp) => resp.json())
    .then((json) => renderToys(json));
}

function renderToys(toys) {
  toys.forEach((toy) => {
    newToy(toy)
  })
}

function newToy(toy){
  let newCard = document.createElement('div')
  newCard.className = "card"
  let cardHeader = document.createElement('h2')
  cardHeader.innerHTML = `${toy.name}`
  let imgTag = document.createElement('img')
  imgTag.className = "toy-avatar"
  imgTag.src = toy.image
  let likesPar = document.createElement("p")
  likesPar.innerText = `${toy.likes} Likes`
  let likeButton = document.createElement('button')
  likeButton.className = "like-btn"
  likeButton.innerText = "LIKE" 
  likeButton.addEventListener('click', (e) => {
    addALike(e, toy)
  })
  newCard.append(cardHeader)
  newCard.append(imgTag)
  newCard.append(likesPar)
  newCard.append(likeButton)
  toyContainer.append(newCard)
}

function submitNewToy() {
  return fetch( 'http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        name: event.target[0].value,
        image: event.target[1].value,
        likes: 0
      } )
    } )
    .then((resp) => resp.json())
    .then((json) => newToy(json))

}

function addALike(e, toy){
  e.preventDefault
  return fetch( `http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        likes: ++toy.likes
      } )
    } )
    .then((resp) => resp.json())
    .then((likes) => e.target.previousElementSibling.innerText = `${toy.likes} Likes`)
}