let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      // console.log(getForm) // = we want to invoke it to see its return
     getForm().addEventListener('submit', addNewToy)

    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();  

});

  // function addNewToy(event) {
  //   event.preventDefault()
  //   // console.log("test")

  //   // let nameElement = document.getElementById("name-field")
  //   // // console.log(nameElement)
  //   // let imageElement = document.getElementById("img-url-field")
  // }

function addNewToy() {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
      body: JSON.stringify({ 
        name: "Woody",
        image: "url",
        likes: 0 //starting point
      })
      //what does stringify do? takes obj -> json
    })
  }

//previousSibling = just gets the node/element before it
//Challenge 1 = fetch andy's toys
//On the index.html page, there is a div with the id "toy-collection."
//When the page loads, make a 'GET' request to fetch all the toy objects.
// With the response data, make a <div class="card"> for each (iterate) toy and add it to the toy-collection div.

// const toys = []

function fetchToys() {
  fetch("http://localhost:3000/toys") //get request
  .then(response => response.json()) //get request/response object  and convert it json data object so we can read it
  .then(toys => toys.forEach(toy => createToy(toy)))
  //console log what data is console.log(data)
  //.then(data => console.log(data)) = it is exactly the array of objects i want
  //we want to iterate through toy array to append each to DOM
  //now we know data = toys
  // we want to do toys.forEach = with a place holder of toy
  //for each toy we want to create toy 

}

function createToy(toyObject) {
  let div = document.createElement("div")
  div.classList.add("card")

  let h2 = document.createElement('h2')
  h2.innerText = toyObject.name 

  let img = document.createElement('img')
  //console.log(img)
  img.src = toyObject.image 
  img.classList.add("class-avatar")

let p = document.createElement("p")
p.innerText = `${toyObject.likes} Likes`
// console.log(p)
let btn = document.createElement("button")
btn.classList.add("like-btn")
btn.innerText = "Like <3"

//append all elements = use append method to pass in all the elements as arguments but must be in order
div.append(h2, img, p, btn)
// console.log(getToyDiv)
//make sure to console.log(div) = to make sure its all showing up right 
//append div to toy collection 

getToyDiv().appendChild(div)
//always remember that if you want the return value of the function
//you need to invoke it!
//
}

function getToyDiv() {
  return document.getElementById("toy-collection")

}

function getForm() {

  return document.querySelector(".add-toy-form")
}
//when we submit post request = update backend and front end at same time 

  //toyObject= what's getting passed in our function 
    //classList = doesn't override what the class it has before it just adds class 
// console.log(div)

  // console.log(toy_obj)


//Challenge 2 = Add Toy to card
//Each card should have the following child elements:
//h2 tag with the toy's name
//img tag with the src of the toy's image attribute and the class name "toy-avatar"
//p tag with how many likes that toy has
//button tag with a class "like-btn"

//when page loads we can see each literal object 
  //always console.log(data))
    //right in here
  //  {
    // for (let i = 0; i < json.length; i++) {
  //     console.log(json[i])
  //   }
  //  })

//iterate through array of toy objects i want to append to DOM

// let toyCollection = document.getElementById('toy-collection')
// //create div 
// document.createElement('div')
// document.createElement('.card')
// toyCollection.innerHTML += 

//iterate through json array
//for each object in array = make me a div that has whatever div needs (class of card)
//make div + h2  (maybe use innertext)
//something to grab on DOM to attach it to , append it to dom 


// toys.push(div node )




//Challenge 3 = Add new Toy
//When a user submits the toy form, 
//a POST request is sent to http://localhost:3000/toys 
//and the new toy is added to Andy's Toy Collection.
//toy should conditionally render to the page.
//In order to send a POST request via Fetch, 
//give the Fetch a second argument of an object. 
//This object should specify the method as POST
// and also provide the appropriate headers and the JSON-ified data for the request.
// If your request isn't working, make sure your header 
//and keys match the documentation.

//Challenge 4 = Increase Toy's Likes
//When a user clicks on a toy's like button, two things should happen:
//Conditional increase to the toy's like count without reloading the page
//A patch request sent to the server 
//at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
//Headers and body are provided below 
//(If your request isn't working, make sure your header and keys match the documentation.)

