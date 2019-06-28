

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toysUrl = "http://localhost:3000/toys"



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
function fetchToys() {
  return fetch(toysUrl)
      .then (resp => resp.json())
      .then (allToys => renderToys(allToys));
}

function renderToys(allToys){
    let toyDiv = document.querySelector('#toy-collection')
    for (let element of allToys){
      let cardDiv = document.createElement('div')
      cardDiv.className = "card"
      cardDiv.innerHTML = `<h2>${element.name}</h2><img src="${element.image}" class="toy-avatar"><p id=toyP${element.id}>${element.likes} likes</p><button class="like-btn" type="button">like</button>`
      toyDiv.appendChild(cardDiv)
    }
    
    // add event listener to all like buttons
    const allButtons = document.querySelectorAll('.like-btn');
    for (let i = 0; i < allButtons.length; i++){
      let self = allButtons[i];
      self.id = i + 1;
      self.addEventListener("click", e => clickSubmission(e));
    }
    
   

    
}

// ====== submit new toy ==========
const form = document.querySelector("form");
form.addEventListener("submit", e => handleSubmission(e));

function handleSubmission(e) {
  e.preventDefault();
  const [nameInputNode, imageInputNode] = e.target;
  const toyObj = {
    name: nameInputNode.value,
    image: imageInputNode.value,
    likes: 0
  };
  // debugger
  createToy(toyObj).then(addNewToy)
}

function createToy(toy){
  return fetch(toysUrl, {
    method: "POST",
    body: JSON.stringify(toy),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }   
  }).then(toy => toy.json());
}

function addNewToy(toy){
  
  const toy_list = document.querySelector("toy-collection")
  let cardDiv = document.createElement('div')
  cardDiv.className = "card"
  cardDiv.innerHTML = `<h2>${toy.name}</h2><img src="${toy.image}" class="toy-avatar"><p>${toy.likes} likes</p><button class="like-btn" type="button">like</button>`
  toy_list.appendChild(cardDiv)  
}


function likeToy(likes, id){
  // debugger
  let newNumber = likes;
  newNumber += 1;
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    body: JSON.stringify({'likes': newNumber}),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }   
  })
  .then(response => response.json())
  .then(console.log)
  .then(showLike(id, newNumber))
}

function showLike(id, newNumber){
  let findP = document.querySelector(`#toyP${id}`)
  findP.innerHTML = `${newNumber} likes`
}

 // ============= like button ===========
 function clickSubmission(e) {
  console.log('hi from click')
  let id = e.target.id;
  // debugger

  return fetch(`http://localhost:3000/toys/${id}`)
    .then(response => response.json())
    .then(toy => toy.likes)
    .then(likes => likeToy(likes, id))

  // debugger
}

document.addEventListener('DOMContentLoaded', function() {
  fetchToys()
})

