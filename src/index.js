const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
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

// YOUR CODE HERE
const toyCollection = document.querySelector('#toy-collection')

const baseAPIURL = "http://localhost:3000"
const toysURL = `${baseAPIURL}/toys`

// ------- fetches toys from the api -----------//
fetch(toysURL)
  .then(response => response.json())
  .then(data => {
    data.forEach(toyData => {
      createToyCard(toyData)
    })
  })

  // ------- Creates each individual toy card -----------//
const createToyCard = toyData => {
  // <div class="card">
  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card')
  // h2 tag with the toy's name
  const cardHeader = document.createElement('h2') // create
  cardHeader.innerHTML = toyData.name // change
  cardDiv.appendChild(cardHeader) // append
  // image tag with the src of the toy's image attribute - needs a class name of "toy-avatar"
  const cardImg = document.createElement('img')
  cardImg.src = toyData.image
  cardImg.classList.add('toy-avatar')
  cardDiv.appendChild(cardImg)
  // p tag with how many likes that toy has
  const cardP = document.createElement('p') // create
  cardP.innerHTML = `Likes: ${toyData.likes}` // change
  cardDiv.appendChild(cardP) // append
  // button tag with an class of "like-btn"
  const cardButton = document.createElement('button') // create
  cardButton.classList.add('like-btn')
  cardButton.innerHTML = `Like <3` // change
  cardDiv.appendChild(cardButton) // append
  toyCollection.appendChild(cardDiv)


   setUpLikeFunctionality(toyData, cardButton, cardP)
}

//------- sets the event listener on the like button ----------//
const setUpLikeFunctionality = (toyData, likeButton, p) => {
  likeButton.addEventListener('click', (event) => {
    toyData.likes++;
    updateToyInBackend(toyData)
      .then(updatedToy => {
        toyData = updatedToy
        p.innerText = `Likes: ${toyData.likes}`
      })
  })
}

// -------- Sends a patch request to update the api ----------//
const updateToyInBackend = toy => {
  return fetch(`${toysURL}/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
    .then(res => res.json())
}

// --------- adds a new toy ---------------//
const addANewToy = toyData => {
  // When a user clicks on the add new toy button - a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.
  // The toy should conditionally render to the page.
  // An example toy to add:
  fetch(toysURL, {
    method: 'POST',
    body: JSON.stringify(toyData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => createToyCard(data))
}
// 
// finds what has been entered into the form
const newtoyname = document.querySelector('#newtoyname')
toyForm.addEventListener('submit', event => {
  event.preventDefault()
  const name = newtoyname.value
  const image = event.target.elements.image.value
  addANewToy({ name, image, likes: 0 })
})
