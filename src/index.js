const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toy_collection = document.getElementById("toy-collection");
let addToy = false
const url = `http://localhost:3000/toys`;

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

let configurationObject = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body:
  {
    "name": "Jessie",
    "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    "likes": 0
  }
}


// OR HERE!
document.addEventListener('DOMContentLoaded', (event) =>{
  getToys();
  addBtn.addEventListener("click", function newToy(){
    return fetch(url, configurationObject)
    .then(response => response.json())
    .then(data => create_card(data))
  })
})

function create_card(toy) {
  let card = document.createElement('div');
  card.className = 'card';
  toy_collection.appendChild(card);

  let name = document.createElement("h2");
  card.appendChild(name);
  name.innerText = data.name;

  let img = document.createElement("img");
  card.appendChild(img);
  img.src = data.image
  img.className = 'toy-avatar';

  let p = document.createElement('p');
  card.appendChild(p);
  p.textContent = data.likes;

  let button = document.createElement("button");
  card.appendChild(button);
  button.className = 'like-btn';
}

function getToys()
{
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => renderToys(data));
}

function renderToys(toysArray)
{
  toysArray.forEach(toy => {
    let card = document.createElement('div');
    card.className = 'card';
    toy_collection.appendChild(card);

    let name = document.createElement("h2");
    card.appendChild(name);
    name.innerText = toy.name;

    let img = document.createElement("img");
    card.appendChild(img);
    img.src = toy.image
    img.className = 'toy-avatar';

    let p = document.createElement('p');
    card.appendChild(p);
    p.textContent = toy.likes;

    let button = document.createElement("button");
    card.appendChild(button);
    button.className = 'like-btn';
  });
}