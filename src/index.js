let addToy = false;
const toyCollection = document.getElementById('toy-collection');
const createToyForm = document.querySelector(".add-toy-form");

let toys; 
const URL = "http://localhost:3000/toys";

function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(function(response) {
  return response.json();
  }).then(function(json) {
    toys = json
    renderToys(toys);
  })
};



function renderToys(toys){
  toys.forEach(toy => {
    let divCard = document.createElement('div');
    divCard.className = "class";
    let nameHeader = document.createElement('h2');
    let imageTag = document.createElement('img');
    imageTag.className = "toy-Avatar";
    let likesP = document.createElement('p');
    let buttonTag = document.createElement('button');
    buttonTag.className = "like-btn";
    buttonTag.innerHTML = "Like <3";
    nameHeader.innerHTML = toy.name;
    imageTag.src = toy.image;
    likesP.innerHTML = `likes: ${toy.likes}`;
    let divs = [nameHeader, imageTag, likesP, buttonTag]; 
    divs.forEach(div => divCard.appendChild(div));
    toyCollection.appendChild(divCard);
  
      buttonTag.addEventListener('click', (e) => {
        e.preventDefault();
        toy.likes = toy.likes += 1;
        fetch(`${URL}/${toy.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            },
          body: JSON.stringify(toy)
        })
        .then(response => response.json())
        .then(json => {
            likesP.innerHTML = `likes: ${json.likes}`;
        });
      });

  });
};





function submitData(name, image){
  let formData = {
    name: name,
    image: image
  };
  
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
    };
  
  return fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object)
  })
  .catch(function(error) {
    alert("error!");
    toyCollection.innerHTML = error.message;
  })
};


createToyForm.addEventListener("submit", (e) => {
  submitData(e.target.name.value, e.target.image.value)
});



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  fetchToys();
  
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

});