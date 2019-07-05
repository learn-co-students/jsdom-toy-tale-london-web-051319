const TOYS_URL = 'http://localhost:3000/toys';
const toyBox = document.querySelector('#toy-collection');

const getData = () => {
  fetch(TOYS_URL)
  .then(data => data.json())
  .then(results => renderAllCards(results))
};

const renderAllCards = (toysData) => {
   toyBox.innerHTML = ""
   for(const toy of toysData) {
      renderToy(toy);
   }
};

const renderToy = (toy) => {
   let div = document.createElement('div');
   div.className = 'card';
   div.id = `card_${toy.id}`;
   let h2 = document.createElement('h2');
   h2.innerText = toy.name;
   let img = document.createElement('img');
   img.src = toy.image;
   img.className = 'toy-avatar';
   let p = document.createElement('p');
   p.innerText = `Likes: ${toy.likes}`;
   let likeButton = document.createElement('button');
   likeButton.innerText = 'Like';
   likeButton.id = `likes_${toy.id}`;
   createListeners(toy, likeButton);
   div.append(h2, img, img, p, likeButton);
   toyBox.append(div);
};

const createListeners = (toy, button) => {
   button.addEventListener('click', (e) => {
      addLike(toy);
   })
};

const addLike = (toy) => {
   let card = document.querySelector(`#card_${toy.id}`)
   let likes = toy.likes;
   let newLikes = parseInt(likes) + 1
   configOpt = {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify({likes: newLikes})
   }
   
   fetch(`${TOYS_URL}/${toy.id}`, configOpt)
   .then(data => data.json())
   .then(results => {
      getData();
      console.log(results)
   })
};


document.addEventListener('DOMContentLoaded', (e) => {getData()})