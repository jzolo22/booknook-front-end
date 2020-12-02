const nameForm = document.querySelector("#username-form")
const h2 = document.querySelector("h2")

let name


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
        .then(console.log)
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