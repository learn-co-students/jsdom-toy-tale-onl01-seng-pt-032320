let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  fetchTheToys();

  toyForm.addEventListener('submit', (event) => {
   let toyName = document.querySelector('input[name="name"]').value;
   let toyURL = document.querySelector('input[name="image"]').value;
   submitToy(toyName, toyURL);
   event.preventDefault();
  });

  function submitToy(toy, url) {
    let formData = { name: toy, image: url, likes: 0 };
    let configObj = { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(formData) };
    fetch("http://localhost:3000/toys", configObj)
    .then(function(response) { return response.json(); })
    .then(function(object) { appendToy(object); })
    .catch(function(error) { console.log(error.message); });
  }

  function appendToy(toy) {
    const mainDiv = document.getElementById("toy-collection");
    let card = document.createElement("div");
    let toyName = document.createElement("h2"); toyName.innerHTML = toy.name; card.appendChild(toyName);
    let toyIMG = document.createElement("img"); toyIMG.src = toy.image; toyIMG.className = "toy-avatar"; card.appendChild(toyIMG);
    let toyLikes = document.createElement("p"); toyLikes.innerHTML = toy.likes+" Likes"; card.appendChild(toyLikes);
    let toyButton = document.createElement("button"); toyButton.className = "like-btn"; toyButton.innerHTML = "Like <3"; 
    toyButton.addEventListener("click", function(){ updateLikes(toy, toyLikes); });
    card.appendChild(toyButton);
    mainDiv.appendChild(card);
    toyFormContainer.style.display = "none"; addToy = false;
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchTheToys() {
  fetch("http://localhost:3000/toys")
  .then(function(response) { return response.json(); }) 
  .then(function(json){ renderTheToys(json); })
}

function renderTheToys(toys) {
  const mainDiv = document.getElementById("toy-collection");
  for (const toy of toys) { 
    let card = document.createElement("div");
    let toyName = document.createElement("h2"); toyName.innerHTML = toy.name; card.appendChild(toyName);
    let toyIMG = document.createElement("img"); toyIMG.src = toy.image; toyIMG.className = "toy-avatar"; card.appendChild(toyIMG);
    let toyLikes = document.createElement("p"); toyLikes.innerHTML = toy.likes+" Likes"; card.appendChild(toyLikes);
    let toyButton = document.createElement("button"); toyButton.className = "like-btn"; toyButton.innerHTML = "Like <3"; 
    toyButton.addEventListener("click", function(){ updateLikes(toy, toyLikes); });
    card.appendChild(toyButton);
    mainDiv.appendChild(card);
  }

}

function updateLikes(toy, toyLikes) {
  let liker = ++toy.likes;
  let formData = { likes: liker };
  let configObj = { method: "PATCH", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(formData) };

  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
  .then(function(response) { return response.json(); }).then(function(object) { console.log(object); }).catch(function(error) { console.log(error.message); });
  toyLikes.innerHTML = liker+" Likes";
}