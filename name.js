const nameForm = document.querySelector("#username-form")
const loginForm = document.querySelector("#login-content")
const h2 = document.querySelector("h2")
const heroText = document.querySelector("#hero-text")
const bgImg = document.querySelector("#bg-img")

let name
let userId

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

onbeforeunload()

nameForm.addEventListener("submit", submitName)

function createUser(name) {
    fetch("http://localhost:3000/users", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(newUser)
    })
        .then(r => r.json())
        .then(newUserObj => {
            userId = newUserObj.id
        })
}


function submitName(event) {
    event.preventDefault()

    loginForm.style.display = "none"
    bgImg.style.display = "none"

    const pageOne = document.querySelector(".bg1");
    pageOne.scrollIntoView({behavior: "smooth"});

    heroText.style.display = "block"
    name = nameForm.name.value
    h2.textContent = `come on in, ${name}`

    newUser = {
        username: name
    }

    createUser(name)

    nameForm.reset()
}
