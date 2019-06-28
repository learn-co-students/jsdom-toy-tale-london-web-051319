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

function showingToy(toy) {
  const toyList = document.querySelector("#toy-collection");
  const div = makeToyCard(toy);
  div.id = toy.id;
  toyList.appendChild(div);
}

function makeToyCard(toy) {
  const div = document.createElement("div");
  div.className = "card";

  const h2 = document.createElement("h2");
  h2.textContent = toy.name;

  const img = document.createElement("img");
  img.className = "toy-avatar";
  img.src = toy.image;

  const p = document.createElement("p");
  p.textContent = toy.likes;

  const button = document.createElement("button");
  button.className = "like-btn"
  button.innerHTML = " <3 ";

  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);

  return div;  
}

function showToys(toyArray) {
  toyArray.map(toy => {
    showingToy(toy);
  });
}

function getToys() {
  fetch("http://localhost:3000/toys")
    .then(toysData => toysData.json())
    .then( toysArray => showToys( toysArray));
}

function init() {
  getToys();
  toyLike();
}

const form = document.querySelector("form");

form.addEventListener("submit", event => handleSubmission(event));

function handleSubmission(event) {
  event.preventDefault();
  const [toyNameNode, imgNode] = event.target;
  const toyObj = {
    name: toyNameNode.value,
    image: imgNode.value
  };

  createToy(toyObj).then(addToy);
}

function  createToy(toy) {
  return fetch("http://localhost:3000/toys", {
    method: "POST", 
    body: JSON.stringify(toy),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(toy => toy.json());
}



function toyLike() { 

 
  
}

init();
// OR HERE! 
