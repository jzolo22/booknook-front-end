// ------------DOM Elements------------------------- //

const addForm = document.querySelector("#add-book-form")


// ------------Fetch Functions------------------------- //

function addBookFetch(bookObj) {
    fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookObj)
    })
        .then(r => r.json())
        .then(console.log)
}


// ------------Event Functions------------------------- //

function handleAdd(event) {
    event.preventDefault()
    const formField = event.target

    const newBook = {
        title: formField.title.value,
        author: formField.author.value,
        genre: formField.genre.value,
        image_url: formField.image_url.value,
        year: formField.year.value,
        description: formField.description.value
    }

    addBookFetch(newBook)
}

// ------------Event Listener------------------------- //

addForm.addEventListener("submit", handleAdd)
