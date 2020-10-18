let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection')
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event => {
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  function fetchToys(){
  return fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json()
})
  .then(function(object){ 
    object.forEach(toy => renderToys(toy))
})
}

function renderToys(toy) {
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')

  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.src = toy.image
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.innerText = "Like <3"
  btn.addEventListener('click', event => {
    likeToy(event)
  })
  divCard.append(h2, img, p, btn)
  toyCollection.append(divCard)
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0
      })
    })

  .then(function(response) {
      return response.json()
  }) 

  .then(function(object){
    let newToy = renderToy(object)
    toyCollection.append(newToy)
  })
};

function likeToy(event) {
  event.preventDefault()
  let plusLike = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": plusLike
      })
    })
    .then(function(response) {
      return response.json()
  }) 
    .then(function(object){
      event.target.previousElementSibling.innerText = `${plusLike} likes`;
    })
}
})