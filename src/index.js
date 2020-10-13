let addToy = false;


 function getAndyToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    console.log(data) 
    const toycollec = document.getElementById("toy-collection")
       data.map{toy => {toycollec.appendChild(`<div class="card"> ${toy.name} <div/>`)} }
  
  });
 }

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
});
