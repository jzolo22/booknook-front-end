const nameForm = document.querySelector("#username-form")
const loginForm = document.querySelector("#login-content")
const h2 = document.querySelector("h2")
const heroText = document.querySelector("#hero-text")
const bgImg = document.querySelector("#bg-img")

let name
let userId


nameForm.addEventListener("submit", submitName)

function createUser(name) {
    const pageOne = document.querySelector(".bg1");
    pageOne.scrollIntoView({behavior: "smooth"});
    loginForm.style.display = "none"
    heroText.style.display = "block"
    bgImg.style.display = "block"

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
    name = nameForm.name.value
    h2.textContent = `come on in, ${name}`

    newUser = {
        username: name
    }

    createUser(name)

    nameForm.reset()
}