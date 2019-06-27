const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysurl = 'http://localhost:3000/toys'

let addToy = false

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

toyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const toy = {
    name: e.target[0].value,
    image: e.target[1].value,
    likes: 0
  }
  console.log(toy)
  postToy(toy).then(resp => resp.json()).then(addToyDiv)
})

function postToy(toy) {
  return fetch(toysurl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
}

function getToys (url){
  return fetch(url).then(resp => resp.json()).then(addToys)
}

function addToys(toys){
  for (toy of toys) {
      addToyDiv(toy);
  }
}

function addToyDiv(toy) {
  const collection = document.getElementById('toy-collection')
  const div = document.createElement('div')
  const h2 = document.createElement('h3')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const button = document.createElement('button')
  div.className = "card"
  div.id = toy.id
  h2.textContent = toy.name
  img.src = toy.image
  img.className = "toy-avatar"
  p.textContent = `${toy.likes} Likes`
  button.className = "like-btn"
  button.onclick = function(e) {addLike(e.target.parentElement)}
  div.append(h2,img,p,button)
  collection.appendChild(div)
  return div
}

function addLike(div) {
  const id = div.id
  const p = div.querySelector('p')
  const likes = parseInt(p.textContent.split(' ')[0]) + 1

  return fetch(`${toysurl}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({likes: likes})
  }).then(p.textContent = `${likes} Likes`)
}

window.addEventListener('DOMContentLoaded', (e) => {
  getToys(toysurl);
});