
// ---------------------------Page Scroll--------------------------------- //

const whiteArrow = document.querySelector(".arrow.down")
const blackArrow = document.querySelector(".arrow.down.black")


const scroll = () => {
    const pageTwo = document.querySelector(".bg2");
    pageTwo.scrollIntoView({behavior: "smooth"});
}

const scrollTwo = () => {
    const pageThree = document.querySelector(".bg2.page-three");
    pageThree.scrollIntoView({behavior: "smooth"});
}

whiteArrow.addEventListener("click", scroll)
// blackArrow.addEventListener("click", scrollTwo)

// ------------------------------------------------------------------------- //



// ------------DOM elements------------------------- //

const firstImage = document.querySelector("#first")
const secondImage = document.querySelector("#second")
const thirdImage = document.querySelector("#third")
const bookContainer = document.querySelector("#book-container")
const editBookForm = document.querySelector("#edit-book-form")
const editForm = document.querySelector("#edit-book-form")

// ------------Fetch functions------------------------- //


// fetch("http://localhost:3000/books/1")
// .then(response => response.json())
// .then(book => {
//     renderOneBookCover(book)
//     console.log(book.image_url)
// })

function fetchBooks () {
    fetch("http://localhost:3000/books")
        .then(r => r.json())
        .then(bookArray => {
            const newArray = bookArray.slice(0, 12)
            bookContainer.innerHTML = ""
            newArray.forEach(book => {
                renderOneBookCover(book)
            })
        })
}


// ------------Render functions------------------------- //


function renderOneBookCover(book) {
    const newBookDiv = document.createElement("div")
    newBookDiv.className = "flex-item"
    const image = document.createElement("img")
    image.classList.add("hvr-float-shadow")
    image.src = book.image_url
    image.alt = book.title
    image.dataset.id = book.id

    newBookDiv.append(image)
    bookContainer.append(newBookDiv)
}

function renderBookInfoDiv(book, container) {
    const bookDiv = document.createElement("div")
    bookDiv.dataset.id = book.id

    bookDiv.innerHTML = `
        <p>${book.title}</p>
        <p>by ${book.author}</p>
        <a href="#add-book-form" id="more-details">more details</a>
    `

    container.append(bookDiv)
}

function formFill(bookObject) {
    editBookForm.title.value = bookObject.title
    editBookForm.author.value = bookObject.author
    editBookForm.genre.value = bookObject.genre
    editBookForm.image_url.value = bookObject.image_url
    editBookForm.year.value = bookObject.year 
    editBookForm.description.value = bookObject.description
    editBookForm.dataset.id = bookObject.id
    
}

// ------------Event Listener------------------------- //
bookContainer.addEventListener("click", event => {
    if (event.target.tagName === "IMG") {
        const id = event.target.dataset.id 
        const flexItem = event.target.closest("div")

        if (flexItem.childElementCount === 1) {
            fetch(`http://localhost:3000/books/${id}`)
                .then(r => r.json())
                .then(bookObj => renderBookInfoDiv(bookObj, flexItem))
        } else {
            const div = flexItem.querySelector("div")
            flexItem.removeChild(div)
        }
    }
})

document.body.addEventListener("click", event => {
    if (event.target.id === "more-details") {
        const editId = parseInt(event.target.parentElement.dataset.id)

        fetch(`http://localhost:3000/books/${editId}`)
        .then(r => r.json())
        .then(bookObject => {
            console.log(bookObject)
            formFill(bookObject)
        })
    }
    
})

editForm.addEventListener("submit", event => {
    event.preventDefault()
    const editFormId = parseInt(event.target.dataset.id)
    const bookDiv = document.querySelector(`div[data-id="${editFormId}"]`)
    const editFormObject = {
        "title": editBookForm.title.value,
        "author": editBookForm.author.value,
        "genre": editBookForm.genre.value,
        "image_url": editBookForm.image_url.value,
        "year": editBookForm.year.value,
        "description": editBookForm.description.value
    }
    
    fetch(`http://localhost:3000/books/${editFormId}`, {
        method: "PATCH",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(editFormObject)
    })
    .then(r => r.json())
    .then(bookObject => {
        bookDiv.innerHTML = ""
        renderBookInfoDiv(bookObject, bookDiv)

    })
 
})



// ------------Initialize------------------------- //

fetchBooks()