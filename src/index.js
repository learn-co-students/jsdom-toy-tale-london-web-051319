const BASE_URL = 'http://localhost:3000/toys'
const TOY_URL = `http://localhost:3000/toys/:id`
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysDiv = document.querySelector('#toy-collection')
const createToyButton = document.querySelector('.submit')
const likeBtn = document.getElementsByClassName('like-btn')


// likeBtn.addEventListener('click', function(e){
//   console.log("hello")
// })


document.addEventListener("DOMContentLoaded", () => {

  fetch(BASE_URL)
    .then(resp => resp.json())
    .then(toysArr => toysArr.forEach(function(toy){
      // console.log(toy)
      makeToyCard(toy)
        }))
      })

  function makeToyCard(toy){
    const div = makeToyDiv()
    const h2 = document.createElement('h2')
    h2.innerText = toy.name
    const img = document.createElement('img')
    img.className = 'toy-avatar'
    img.src = toy.image
    const p = document.createElement('p')
    p.innerText = `Likes: ${toy.likes}`
    const button = document.createElement('button')
    button.className = 'like-btn'
    button.innerText = " Like "

    div.append(h2, img, p, button)
    toysDiv.append(div)

    button.addEventListener('click', function(e){

      console.log(e.target)
      // increment likes on screen first
      let newLikes = toy.likes+=1
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
// JSON.stringify(toy),

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(toy)
      }).then(resp => resp.json())
      .then(updatedToy => p.innerText = `Likes: ${updatedToy.likes}`)

    })

  }


// event for clicking button. when clicked, increment toy.likes on page
// e.target.likes is changed
//fetch (patch) is made
// fetch takes new url, object{method, body, headers}
// on resolution, create increment likes function(currentLikes), return new likes
//


// function createnewtoy(){
//   // const toyName = document.querySelector('#new-toy-name')
//   // const toyImg = document.querySelector('#new-toy-img')
//   // console.log(toyName, toyImg)
//
//
// }

function addNewToy(toy){
  return fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(toy),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(toy => toy.json())
    .then(toy => makeToyCard(toy))
}

// function appendNewToy(toy){
//   makeToyCard(toy)
//   // toysDiv.append(toy)
// }


toyForm.addEventListener('submit', function(e){
  // e.preventDefault()
  const newName = e.target.name.value
  const newImg = e.target.image.value
  const toy = {
    name: newName,
    image: newImg
  }
  addNewToy(toy)

  // appendNewToy(toy)

  // debugger
  })


let addToy = false

function makeToyDiv(){
  const div = document.createElement('div')
  div.className = 'card'
  return div
}


    // iterate through toys and each toy, create new card and add data to it


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

// //
//   button.addEventListener('click', function(buttonClick){
//     console.log({buttonClick})
// })

// OR HERE!
