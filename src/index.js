const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const createToyForm = document.querySelector('.add-toy-form');
let addToy = false;

function getAndPrintToys() {
  return fetch('http://localhost:3000/toys')
    .then(toys => toys.json())
    .then(toys => makeToyCards(toys));
}

function makeToyCards(json) {
  const toys = json;
  toys.forEach(toy => {
    makeCard(toy)
  });
}

function makeCard(toy) {
  let url = toy['image'];
  let name = toy['name'];
  let likes = toy['likes'];
  let id = toy['id'];

  // creating elements
  let h2 = document.createElement('h2');
  let img = document.createElement('img');
  let p = document.createElement('p');
  let btn = document.createElement('button');
  let div = document.createElement('div');
  let hidden = document.createElement('span');

  let container = document.querySelector('#toy-collection')

  // assigning values to html tags
  h2.textContent = name;
  p.textContent = `${likes} Likes`;
  btn.textContent = 'Like <3';
  hidden.textContent = id.toString();
  //setting attributes
  img.setAttribute('src', url);
  img.className = 'toy-avatar';
  btn.className = 'like-btn';
  div.className = 'card';
  hidden.className = 'hidden';
  //appending to make card
  div.append(h2, img, p, btn, hidden);

  btn.addEventListener('click', e => createLike(e));
  container.append(div);
}

function createToy(e) {
  e.preventDefault();

  const [name, img] = e.target;
  const newToyObj = {
    name: name.value,
    image: img.value,
    likes: 0
  };
  const toysObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newToyObj)
  };

  fetch('http://localhost:3000/toys', toysObj)
    .then(toy => toy.json())
    .then(toy => makeCard(toy));
}

function createLike(e) {
  let parent = e.target.parentElement;
  let name = parent.childNodes[0].value;
  let id = parseInt(parent.childNodes[4].textContent);
  let p = parent.childNodes[2];

  fetch(`http://localhost:3000/toys/${id}`)
    .then(toy => toy.json())
    .then(toy => {
      let likes = toy.likes + 1;
      patchLike(id, likes, p);
    });
}

function patchLike(id, likes, likes_p) {
  fetch(`http://localhost:3000/toys/${id}`, {

    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "id": id,
      "likes": likes
    })

  }).then(toy => toy.json())
    .then(toy => likes_p.textContent = `${toy.likes} Likes`);
}

createToyForm.addEventListener('submit', e => createToy(e));

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = 'block';
    // submit listener here
  } else {
    toyForm.style.display = 'none';
  }
});

getAndPrintToys();
