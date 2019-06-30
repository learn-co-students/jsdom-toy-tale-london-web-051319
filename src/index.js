const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addForm = document.getElementById('toy-form')
var likeButton = document.querySelectorAll("button")

let addToy = false


document.addEventListener('DOMContentLoaded', function() {
  fetchToys()
})


// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy

  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


addForm.addEventListener('submit', submitForm)

function submitForm(event){
  // event.preventDefault();
  console.log(event.target)
name = document.getElementById("name").value
image = document.getElementById("image").value

const toyObj = {
    name: name,
    image: image,
    likes: 0
  };

console.log(toyObj)

fetch("http://localhost:3000/toys", {
    method: "POST",
    body: JSON.stringify(toyObj),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(toy => toy.json());

}

function fetchToys(){
  fetch("http://localhost:3000/toys")
    .then(toyData => toyData.json())
    .then(toyArray => createToy(toyArray))
  }

function createToy(toys){
toys.map(toy => {
var toyCollection = document.getElementById("toy-collection")
var div = document.createElement("div")
div.className = "card"
var h2 = document.createElement("h2")
h2.textContent = toy.name
var image = document.createElement("img")
image.className = "toy-avatar"
image.src = toy.image
var p = document.createElement("p")
p.textContent = toy.likes
var button = document.createElement("button")
button.className = "button"
button.textContent = "Like"
div.appendChild(h2)
div.appendChild(image)
div.appendChild(p)
div.appendChild(button)
toyCollection.appendChild(div)

button.addEventListener("click", e => {
    let likes = toy.likes+=1
    // likes+=1
    console.log(likes)
      fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            likes: likes
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(toy => toy.json())
            .then(updatedToy => p.innerText = updatedToy.likes);
})
});

}






















// function addToys(toyArray){
//
//   var toyCollection = document.getElementById("toy-collection")
//   var
//
// // for ever toy
//       // - create a card
//       // add a toy to every card
//   toysArray.map(
//       toy => x * 2)
//
// }



// OR HERE!




  //
  // var toyCollection = document.getElementById("toy-collection")
  // var div = document.createElement("div")
  // div.className = "card"
  // var h2 = document.createElement("h2")
  // h2.textContent = name
  // var image = document.createElement("img")
  // image.className = "toy-avatar"
  // image.src = image
  // var p = document.createElement("p")
  // p.textContent = 0
  // var button = document.createElement("button")
  // button.className = "button"
  // button.textContent = "Like"
  // div.appendChild(h2)
  // div.appendChild(image)
  // div.appendChild(p)
  // div.appendChild(button)
  // toyCollection.appendChild(div)
