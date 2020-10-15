let addToy = false;
const toyUrl = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionContainer = document.getElementById("toy-collection");
  const toyForm = document.querySelector(".add-toy-form");

  function createNewToyCard(toy) {
    const newToyCard = document.createElement("DIV");
    const newToyName = document.createElement("H2");
    const newToyImg = document.createElement("IMG");
    const newToyLikes = document.createElement("P");
    const newToyButton = document.createElement("BUTTON");

    newToyCard.classList.add("card");
    newToyName.innerHTML = toy.name;
    newToyImg.src = toy.image;
    newToyImg.classList.add("toy-avatar");
    newToyLikes.innerHTML = toy.likes + " Likes";
    newToyButton.classList.add("like-btn");
    newToyButton.innerHTML = "Like <3";
    newToyCard.appendChild(newToyName);
    newToyCard.appendChild(newToyImg);
    newToyCard.appendChild(newToyLikes);
    newToyCard.appendChild(newToyButton);

    newToyButton.addEventListener("click", function() {
      let likesNumber = toy.likes + 1;
      const toyID = toy.id;
      patchToy(toyID, likesNumber);
    });

    toyCollectionContainer.append(newToyCard);
  }

  function submitNewToy(name, imageUrl) {
    let toyData = {
      name: name,
      image: imageUrl,
      likes: 0
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyData)
    };

    fetch(toyUrl, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      createNewToyCard(object);
    })
    .catch(function(error) {
      alert("There's a snake in my boot!");
      console.log(error.message);
    })
  }

  function patchToy(toyID, likeNumber) {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({"likes": likeNumber})
    };
    fetch((toyUrl + `/${toyID}`), configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
    })
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

  toyForm.addEventListener("submit", function(e) {
    e.preventDefault();
 
    const name = toyForm.elements["name"].value;
    const imageUrl = toyForm.elements["image"].value;

    submitNewToy(name, imageUrl);
  })

  fetch(toyUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    object.forEach(toy => {
      createNewToyCard(toy);
    })
  });
});
