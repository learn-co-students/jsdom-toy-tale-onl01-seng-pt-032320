document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;
  let collection = document.getElementById('toy-collection')
  const addBtn = document.getElementById('new-toy-btn')
  const toyForm = document.querySelector('.container')
  

  addBtn.addEventListener("click", () => {
    
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyForm.style.display = "none";
    }
  });


function getToys(){
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}


function renderToys(toy){
  let h2 = document.createElement('h2')
  h2.innerText = toy.name;

  let img = document.createElement('img')
  img.setAttribute('src',toy.image)
  img.setAttribute('class','toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class','like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = 'like'
  btn.addEventListener('click', (event)=>{
    console.log(event.target.dataset);
    likes(event)
  })

let card = document.createElement('div')
card.setAttribute('class','card')
card.append(h2,img,p,btn)
collection.append(card)


}

function postToy(toy_data){
let configObj = {
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
}
  fetch('http://localhost:3000/toys', configObj)
  .then(res => res.json())
  .then((toy_obj) =>{
    let new_toy = renderToys(toy_obj)
    collection.append(new_toy)
  })
}


function likes(event){
  event.preventDefault()
  let moreLikes = parseInt(event.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": moreLikes
    })
  })
  .then(res => res.json())
  .then((like_obj => {
    event.target.previousElementSibling.innerText = `${moreLikes} likes`;
  }))


}

getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
})





});