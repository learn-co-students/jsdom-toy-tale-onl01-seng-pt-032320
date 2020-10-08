let addToy = false;
const toyCollection = document.getElementById('toy-collection');
const addToyBtn = document.querySelector('#new-toy-btn') //#specifies id
const addToyForm = document.querySelector(".add-toy-form") // .specify its a class


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  fetchToys()

  //atach submit event... this is for the "add new toy function"
  addToyForm.addEventListener("submit", addNewToy)


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

// 1. fetch Andys toys

function fetchToys() {
  const toyURL = "http://localhost:3000/toys"
  fetch(toyURL)
    .then((response) => response.json())
    .then((result) => { 
      let toys = result
      console.log(toys)
      addToyInfoToCard(toys)
      })
    };

// 2. with the response data, make <div class ="card" for each toy
// 3. Add toy info to card

function addToyInfoToCard(toys) {

  toys.forEach(toy => {
    let toyDivCard = document.createElement('div')
        toyDivCard.setAttribute('class', 'card')

    //for each div.card add h2, image, p, btn

    //h2 tag with toys name
    let h2 = document.createElement("h2")
        h2.appendChild(toyDivCard)
        h2.innerHTML = toy.name
      
    //img tag with the src of teh toys image attribute and the class name "toy-avatar"
    let img = document.createElement('img')
    img.src = toy.image
        img.className = "toy-avatar"

    // p tag with how many likes that toy has
    let p = document.createElement("p")
        p.innerHTML = `${toy.likes} likes`

    // button tag with a class "like-btn"
    let btn = document.createElement('button')
        btn.className = "like-btn"
        btn.innerHTML = "Like"

        // when someone clicks the like button it goes to increase toy likes function
        btn.addEventListener("click", (e) =>{
          increaseToyLikes(e, toy)
        })

    //attach all these infos onto toydivcard and attach all toydiv cards onto toycollection container
    let toyCardInfo = [h2, img, p, btn]
        toyCardInfo.forEach(infopiece => {
          toyDivCard.appendChild(infopiece)
          toyCollection.appendChild(toyDivCard)
        })
      })
     }

     // 4. Add a new toy 

     //passing arguments --calls functions immediately
function addNewToy () { 
     // so user fills out form and submit name and image
     event.preventDefault() //prevent default get request
     console.log(event)
     //debugger

     let configObj = {
       method: "POST",
       headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        name: event.target[0].value,
        image: event.target[1].value //getting into the form and grabbing the value...maybe could also do with name.value, image.value ??
      })
    };
     
        //fetch the post data and add new toy to collection

      return fetch("http://localhost:3000/toys", configObj) //return fetch with our config obj paramerters
        .then((response) => response.json())
        .then((result) => { 
            let newToy = result
//append new toy to div card and collection?
            toyCollection.append(newToy)
      console.log(newToy)
        })
}

      // 5. Increase Likes

function increaseToyLikes(e, toy) {
  event.preventDefault()

  //patch request
  let configObjForLikes = {
    method: "PATCH",
    headers: {
     "Content-Type": "application/json",
     "Accept": "application/json"
   }, 
   body: JSON.stringify( {
     likes: ++toy.likes
   })
  }

   return fetch(`http://localhost:3000/toys/${toy.id}`, configObjForLikes) //this isnt working because of :id
    .then((response) => response.json())
    .then((result) => { 
        //p = document.querySelector('div.card')
        //p.innerHTML = `${result.likes} likes`
        e.target.previousElementSibling.innerText = `${toy.likes} Likes`
   })
}


