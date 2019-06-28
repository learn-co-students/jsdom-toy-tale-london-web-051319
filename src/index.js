const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

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


// OR HERE
let toyShelf = document.getElementById('toy-collection')

function fetchToys() {
  return fetch('http://localhost:3000/toys')
    .then(toyData => toyData.json())
    .then(toysObj => renderToys(toysObj))
}

function addToyCard(toy) {
  let id = toy.id;
  let imgurl = toy.image;
  let name = toy.name;
  let likes = toy.likes;

  let newdiv = document.createElement('div');
  newdiv.className = 'card'
  let h5 = document.createElement('h5');
  h5.className = 'card-title'
  let img = document.createElement('img');
  img.className = 'card-img-top'
  let p = document.createElement('p');
  p.className = 'like-count'
  let likeGlyph = document.createElement('p');
  likeGlyph.className = "like-button";
  let span = document.createElement('span');
  span.className = 'hidden'

  
  span.textContent = id.toString();
  likeGlyph.innerHTML = `&#9825;`
  h5.innerText = name;
  img.setAttribute('src', imgurl);
  p.innerHTML = `${likes}`;
  p.id 

  p.appendChild(likeGlyph);
  newdiv.append(h5, img, p, span);
  toyShelf.appendChild(newdiv);
  // debugger

  likeGlyph.addEventListener('click', event => {
    event.preventDefault();
    addLike(event);
    event.target.innerHTML = '&#128147'
  })
}

function addLike(e) {

  let parentNode = e.target.parentNode.parentElement;
  let toyId = parseInt(parentNode.querySelector('span').innerText);
  let toyLikes = parseInt(parentNode.querySelector('.like-count').innerText);

  fetch(`http://localhost:3000/toys/${toyId}`)
    .then(toy => toy.json())
    .then(toy => {
      let toyLikes = toy.likes += 1
      updateLikes(toyId,toyLikes)
    })
    
  debugger
}

function updateLikes(id, toyLikes) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      // Accept: 'application/json'
    },
    body: JSON.stringify({
      'id': id,
      'likes': toyLikes
    })
  }).then(toy => toy.json())
  .then(toy => toyLikes.innerText = `${toy.likes}`);
  
}


function renderToys(toysObjs) {
  const toys = toysObjs;
  for (let i = 0; i < toys.length; i++) {
    // debugger
    addToyCard(toys[i])
  } 
}

function createToy(newToyObj) {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    body: JSON.stringify(newToyObj),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(newToyData => newToyData.json)
  // debugger
}

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const [inputName, inputUrl] = event.target
  const newToy = {
    name: inputName.value,
    image: inputUrl.value,
    likes: 12
  }
  createToy(newToy).then(renderToys);
  // debugger
  console.log("Form was submitted");
})

// function 

window.addEventListener('DOMContentLoaded', event => {
  fetchToys();
})