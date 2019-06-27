document.addEventListener('DOMContentLoaded', () => {
  init()
})

function init () {
  fetchToys(url)
}

// get globals

const addBtn = document.querySelector('#new-toy-btn')
const toyContainer = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const toyForm = document.querySelector('#toy-form')
const url = 'http://localhost:3000/toys'

let addToy = false

let formData = new FormData(toyForm)

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyContainer.style.display = 'block'
    addClick()
  } else {
    toyContainer.style.display = 'none'
  }
})

// OR HERE!

// make get request to fetch toy objects

function fetchToys (url) {
  return fetch(url)
    .then(response => response.json())
    .then(renderAllToys)
}

// make a div card and add to toy collection div

function makeCard () {
  card = document.createElement('div')
  card.className = 'card'
  addElementsToCard(card)
  return card
}

// add element to card - h2, img src, p, button

function addElementsToCard (card) {
  h2 = document.createElement('h2')
  img = document.createElement('img')
  img.className = 'toy-avatar'
  p = document.createElement('p')
  button = document.createElement('button')
  button.addEventListener('click', addLike)
  card.append(h2, img, p, button)
}

// add info to card

function addInfoToCard (card, toyObj) {
  card.childNodes[0].innerHTML = `${toyObj.name}`
  toyObj.image = card.childNodes[1].src = `${toyObj.image}`
  toyObj.likes = card.childNodes[2].innerHTML = `${toyObj.likes}`
  card.childNodes[3].id = `${toyObj.id}`
}

function renderAllToys (toysArray) {
  toysArray.forEach(toy => {
    renderSingleToy(toy)
  })
}

function renderSingleToy (toy) {
  card = makeCard()
  addInfoToCard(card, toy)
  toyCollection.append(card)
}

// ADD NEW TOY

// click button - post request add toy to collection

function addClick () {
  toyForm.addEventListener('submit', event => {
    event.preventDefault()
    let toy = new Object()
    toy.name = event.target[0].value
    toy.image = event.target[1].value
    toy.likes = 0
    addToyToDB(toy)
  })
}

// conditionally renders to page - call renderToy(toy)

function addToyToDB (toy) {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
    .then(response => response.json())
    .then(renderSingleToy)
}

//  INCREASE LIKES

// conditional increase to toy's like count - event listener on button

function currentLikes (id) {
  currentLikes = document.getElementById(id)
  likes = currentLikes.parentNode.childNodes[2].innerText
  return likes
}

function addLike (event) {
  let newNumber = parseInt((currentLikes(event.target.id)))
  newNumber += 1
  debugger
  return fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'likes': newNumber})
  })
    .then(response => response.json())
    .then(console.log)
}

// patch to toys/id to update likes
function deleteToy (id) {
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: 'DELETE'
})
}