  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const form = document.querySelector("form");
  const toyCollection = document.querySelector("#toy-collection");

  const toyUrl = "http://localhost:3000/toys";
  let addToy = false;

  // YOUR CODE HERE


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block';
      // submit listener here
    } else {
      toyForm.style.display = 'none';
    }
  });

  function fetchToys() {
    fetch(toyUrl)
      .then(data => data.json())
      .then(allToys => renderToys(allToys));
  }

  function renderToys(allToys) {

    for (let toy of allToys) {
      let div = document.createElement('div');
      div.className = "card";
      div.innerHTML = `<h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar"/>
      <p id=toy__${toy.id}>${toy.likes} likes</p>
      <button class="like-btn" type="button">Like</button>
      `;
      toyCollection.appendChild(div);
    }
    const allButtons = document.querySelectorAll('.like-btn');
    for (let i = 0; i < allButtons.length; i++) {
      let self = allButtons[i];
      self.id = i + 1;
      self.addEventListener("click", e => clickSubmission(e));
    }
  }
  // OR HERE!

  form.addEventListener("submit", e => handleSubmission(e));

  function handleSubmission(e) {
    e.preventDefault();
    const [nameInputNode, imageInputNode] = e.target;
    const toyObj = {
      name: nameInputNode.value,
      image: imageInputNode.value,
    };

    createToy(toyObj).then(renderToys);
  }


  function createToy(toy) {
    return fetch(toyUrl, {
      method: "POST",
      body: JSON.stringify(toy),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(toy => toy.json());
  }


  function likeToy(likes, id) {
    let counter = likes
    counter += 1;
    return fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          'likes': counter
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(response => response.json())
      .then(console.log)
      .then(showLike(id, counter));
  }

  function showLike(id, counter) {
    let toyLikes = document.querySelector(`#toy__${id}`);
    toyLikes.innerHTML = `${counter} likes`;
  }


  function clickSubmission(e) {
    console.log('like')
    let id = e.target.id;

    return fetch(`http://localhost:3000/toys/${id}`)
      .then(response => response.json())
      .then(toy => toy.likes)
      .then(likes => likeToy(likes, id));
  }



  document.addEventListener('DOMContentLoaded', function() {
    fetchToys()
  })