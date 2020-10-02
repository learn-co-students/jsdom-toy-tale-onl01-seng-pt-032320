
    const URL = "http://localhost:3000/toys";
    const toyCollection = document.getElementById("toy-collection");
    const toyForm = document.querySelector(".add-toy-form");

    let andysToys;

    function fetchToys() {
      return fetch(URL)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          andysToys = json;
          showToys(andysToys);
        });
    };

    function showToys(andysToys) {
      andysToys.forEach(toy => {
        let card = document.createElement("div");
        card.className = "class";
        let hTwo = document.createElement("h2");
        let img = document.createElement("img");
        img.src = toy.image;
        img.className = "toy-Avatar";
        let ptag = document.createElement("p");
        ptag.innerHTML = `${toy.likes} Likes`;
        let button = document.createElement("button");
        button.className = "like-btn";
        button.innerHTMl = "Like <3";
        let divs = [hTwo, img, ptag, button];
        divs.forEach(div => card.appendChild(div));
        toyCollection.appendChild(card);

        button.addEventListener('click', function(e) {
          e.preventDefault();
          toy.likes = toy.likes += 1;
          fetch(`${URL}/${toy.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(toy)
          })
          .then(response => response.json())
          .then(json => {
            ptag.innerHTML = `${json.likes} Likes`;
          });
        });
      });
    };

    function submitData(name, image, likes) {
      let formData = {
          name: `${name}`,
          image: `${image}`,
          likes: `${likes}`
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
          toyCollection.innerHTML = error.message  
      });   
  };

  

  toyForm.addEventListener("submit", function(e) {
    submitData(e.target.name.value, e.target.image.value, e.target.likes.value)
  });



  document.addEventListener("DOMContentLoaded", () => {
    let addToy = false;
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    fetchToys();
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }


  });
