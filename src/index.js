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
      newButton.addEventListener('click', function(e) {
         like(jsonData[i]);
      });
      newCard.append(newHeader, newImg, newLikes, newButton);
      container.append(newCard);
   }
};

let like = (object) => {
   debugger
};

// POST SECTION
