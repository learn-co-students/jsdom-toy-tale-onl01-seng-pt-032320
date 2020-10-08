let addToy = false;

 const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
 
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toys => {
    // take my toys array make them HTML in order to add them to the DOM
    let toysHTML = toys.map(function(toy){
      return ` 
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      </div>
      `

    })
   document.querySelector("#toy-collection").innerHTML = toysHTML.join('')
    
  })

toyForm.addEventListener("submit", function(e){
  e.preventDefault()
  console.log(e.target.name)
  const toyName = e.target.name.value
  const toyImage = e.target.image.value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 99
    })
  })
  .then(r => r.json())
  .then(newToy => console.log(newToy))

})

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    // code here
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
