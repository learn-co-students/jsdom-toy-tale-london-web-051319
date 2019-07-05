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


// PAGE RENDER
document.addEventListener('DOMContentLoaded', function(e) {
   init();
});

const BASE_URL = 'http://localhost:3000/toys';

let init = () => {
   fetch(BASE_URL)
   .then(data => data.json())
   .then(jsonData => display(jsonData));
};

let display = (jsonData) => {
   const container = document.querySelector('#toy-collection');
   container.innerHTML = '';
   for(i = 0; i < jsonData.length; i++) {
      let newCard = document.createElement('div');
      newCard.className = 'card';
      let newHeader = document.createElement('h2');
      newHeader.innerText = jsonData[i].name;
      let newImg = document.createElement('img');
      newImg.src = jsonData[i].image;
      newImg.className = 'toy-avatar'
      let newLikes = document.createElement('p');
      newLikes.innerHTML = jsonData[i].likes;
      let newButton = document.createElement('button');
      newButton.innerText = 'Like!';
      newButton.id = jsonData[i].id;
      newButton.value = jsonData[i].likes;
      newButton.addEventListener('click', like); // put the function in second without brackets!!!
      newCard.append(newHeader, newImg, newLikes, newButton);
      container.append(newCard);
   }
};

let like = (event) => {
   console.log(event)
   let toyId = event.target.id;
   let value = parseInt(event.target.value);
   let newValue = value + 1;

      fetch(`${BASE_URL}/${toyId}`, {
         method: "PATCH",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({likes: `${newValue}`}),  //{"likes": newValue}
      })
      .then(data => data.json())
      .then(function(e) {
         init();
      });
      // .then(console.log);
}

// POST SECTION

let addNewToy = (name, image) => {

   let data = {
      name: name.value,
      image: image.value,
      likes: 0
   }

   fetch(BASE_URL, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
   })
   .then(toy => toy.json())
   .catch(error => console.log(error))
   .then(function(e) {
      init();
      toyForm.style.display = 'none';
   });
}

const newToyForm = document.querySelector('form.add-toy-form');
const name = newToyForm.querySelector('#toy-form-name')
const image = newToyForm.querySelector('#toy-form-img')

newToyForm.addEventListener('submit', function(e) {
   e.preventDefault(); // this stops the addition on refresh
   addNewToy(name, image);
})
// newToyForm.onsubmit = addNewToy(name, image);
