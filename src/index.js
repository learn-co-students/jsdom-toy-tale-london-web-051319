const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const TOYS_URL = "http://localhost:3000/toys"
let addToy = false
const toyCollectionDiv = document.querySelector("#toy-collection") 

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


// OR HERE!
fetch(TOYS_URL)
.then(data => data.json())
.then(toysObjects => makeToy(toysObjects));

function makeToy(toysObjects) {
  for (toy of toysObjects) {
    toyCard = document.createElement("div")
    toyCard.setAttribute("class", "card");
    toyCollectionDiv.appendChild(toyCard)
    addToyInfo(toy)
  }
}



function addToyInfo(toy) {
  toyName = document.createElement("h2")
  toyName.innerText = toy.name
  toyImg = document.createElement("img");
  toyImg.src = toy.image;
  toyImg.setAttribute("class", "toy-avatar");
  toyLikes = document.createElement("p");
  toyLikes.innerText = `${toy.likes} likes`;
  toyLikeButton = document.createElement("button");
  toyLikeButton.setAttribute("class", "like-btn");
  toyLikeButton.id = `${toy.id}`
  toyLikeButton.addEventListener("click", getCurrentLike)

  toyLikeButton.innerHTML = "Like <3"
  toyCard.append(toyName, toyImg, toyLikes, toyLikeButton); 
}

// let formData = new FormData(document.querySelector(".add-toy-form"));
let newToyForm = document.querySelector(".add-toy-form"); 

newToyForm.addEventListener("submit", e => handleSubmission(e))

function handleSubmission(event) {
  event.preventDefault();
  const newToyObj = {
    name: event.target[0].value, 
    image: event.target[1].value
  }
  makeNewToyCard(newToyObj)
  createNewToy(newToyObj)
}

function makeNewToyCard(newToyObj) {
  toyCard = document.createElement("div")
    toyCard.setAttribute("class", "card");
    toyCollectionDiv.appendChild(toyCard)
    addToyInfo(newToyObj)
}


function createNewToy(newToyObj) {
  return fetch(TOYS_URL, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:
      JSON.stringify(newToyObj)
  })
}

const likeButton = document.querySelectorAll("#toy")

function getCurrentLike(event) {
  let toyID = event.target.id
  return fetch(`${TOYS_URL}/${toyID}`)
  .then(data => data.json())
  .then(toy => {
        let currentLike = toy.likes
        increaseToyLike(currentLike, toyID)
      }
  )
  
}
function increaseToyLike(currentLike, toyID) {
  let newLike = currentLike + 1;
  console.log(newLike)
  fetch(`${TOYS_URL}/${toyID}`, {
        method: "PATCH",
        body:
          JSON.stringify({likes: newLike}),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
  .then(data => data.json())
  .then(console.log)
}


// find likebutton
//add event listener is each button when made
// on click increase toy.like ++ 
// send patch request
