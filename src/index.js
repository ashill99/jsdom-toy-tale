let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("div#toy-collection")
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => {
      data.forEach(function (toyObj) {
        let card = document.createElement('div')
        card.dataset.id = toyObj.id
        let newH2 = document.createElement('h2')
        let img = document.createElement('img')
        let p = document.createElement('p')
        let btn = document.createElement('button')
        card.classList.add("card")
        btn.classList.add('like-btn')
        img.classList.add('toy-avatar')
        img.src = toyObj.image
        newH2.classList.add('name')
        newH2.textContent = toyObj.name
        p.textContent = `${toyObj.likes} Likes`
        btn.textContent = "Like <3"
        card.append(newH2, img, p, btn)
        toyCollection.append(card)
      })
      console.log(data)
    })
});

const newToyForm = document.querySelector("form.add-toy-form")

newToyForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const newToyObject = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0,
  }

  const configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToyObject)
  }

  fetch("http://localhost:3000/toys", configObj)

    .then((response) => response.json())
    .then(data => {
      console.log('success:', data)
    })
  console.log(newToyObject)
  event.target.reset()
})

const toyCollection = document.querySelector("div#toy-collection")

toyCollection.addEventListener("click", function (event) {
  const toyDiv = event.target.closest("div.card")
  console.log(toyDiv)
  let pTag = toyDiv.querySelector("p")
  let likesNum = parseInt(pTag.textContent) + 1
  if (event.target.matches(".like-btn")) {
    const id = toyDiv.dataset.id
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: likesNum
      })
    }).then((response) => response.json())
      .then((data) => {
        pTag.textContent = `${data.likes} Likes`
        console.log(data)
      })
  }
  console.log("clicked")
})
