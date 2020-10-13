let addToy = false;

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

 function getAndyToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
        document.querySelector("#toy-collection").innerHTML += `
        <div class="card" id=${element.id}>
          <h2>${element.name}</h2>
          <img src="${element.image}" height="120">
          <p>${element.likes}</p>
          <button class="like-btn">Like</button>
        </div>  
      `
    })
    likeBtns = document.querySelectorAll(".like-btn");
    likeBtns.forEach(btn => {

        btn.addEventListener("click", function addLike(el) {

            let add = parseInt(document.querySelector(".like-btn").parentElement.childNodes[5].innerText) + 1
            return fetch(`http://localhost:3000/toys/${el.target.parentElement.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        "likes": add
                    })
                })
                .then(response => response.json())
                .then(data => {
                    document.querySelector(".like-btn").parentElement.childNodes[5].innerText = `${add}`
                    console.log(add)
                    el.preventDefault()
                })
        })
    })
})
}

function createToy() {
  return fetch('http://localhost:3000/toys', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({
            "name": toy_data.name.value,
            "image": toy_data.image.value,
            "likes": 0
          })
      })
      .then(response => response.json())
      .then(data => console.log(data))
}

//  function createToy(toy){
//   const toycollec = document.getElementById("toy-collection")
//     const card = document.createElement("div")
//     const  htag = document.createElement("h2")
//     const ptag = document.createElement("p")
//     const imgtag = document.createElement("img")
//     const buttontag = document.createElement("button")
//         card.className = "card"
//         imgtag.className = "toy-avatar"
//         buttontag.className = "like-btn"
       
//         htag.innerText = toy.name
//          imgtag.src = toy.image
//          ptag.innerText = toy.likes
//          buttontag.innerText = "like-btn"
//              toycollec.appendChild(card)
//            card.append(htag, imgtag, ptag, buttontag) 
//         //  document.getElementById("imageid").src="../template/save.png";
//     // element.className += " " + newClassName


//     // creates toy collection
//    }


// function eachToy(toys){
// // uses create toy method to add each toy to the collection
//   toys.map(toy => createToy(toy));

// }
