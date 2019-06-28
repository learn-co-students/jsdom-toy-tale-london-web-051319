const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addAToy = false

document.addEventListener('DOMContentLoaded', function() {
    getAllToys()
  })

function getAllToys() {
  return fetch('http://localhost:3000/toys')
  .then(toyData => toyData.json())
  .then(toyArray => showToys(toyArray));
}

function showToys(toyArray) {
  toyArray.map(toy => {
    addToy(toy);
  });
}

function addToy(toy) {
  const toy_list = document.querySelector('#toy-collection');
  const div = makeToy(toy);
  toy_list.appendChild(div);
}

function makeToy(toy) {
  const div = document.createElement("div");
  div.className = "card";

  const h2 = document.createElement("h2");
  h2.textContent = toy.name;

  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar"

  const p = document.createElement("p");
  p.textContent = `Likes: ${toy.likes}`;

  const likeButton = document.createElement("button");
  likeButton.id = `${toy.id}`
  likeButton.innerText = "Like"
  likeButton.addEventListener("click", e => handleLikes(e));

  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.append(likeButton);

  return div;
}


addBtn.addEventListener('click', () => {
  addAToy = !addAToy
  if (addAToy) {
    toyForm.style.display = 'block'
    const submitForm = document.querySelector(".add-toy-form")
    submitForm.addEventListener("submit", e => handleSubmission(e));
  } else {
    toyForm.style.display = 'none'
  }
})

function handleSubmission(e) {
  e.preventDefault()
  const [nameInputNode, imgInputNode] = e.target;
  const toyObj = {
    name: nameInputNode.value,
    image: imgInputNode.value,
  };
  createAToy(toyObj).then(addToy);
}

function createAToy(toy) {
  return fetch('http://localhost:3000/toys', {
    method: "POST",
    body: JSON.stringify(toy),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(toy => toy.json());
}

function handleLikes(e){
  let id = parseInt(e.target.id)
  getToyLikes(id)
}

function getToyLikes(id) {
  return fetch(`http://localhost:3000/toys/${id}`)
  .then(toyData => toyData.json())
  .then(toy => toy.likes)
  .then(toylikes => createALike(id,parseInt(toylikes)))
}

function createALike(id,likes) {
  likes++;
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      likes: `${likes}`
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}
