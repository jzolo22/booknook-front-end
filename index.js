
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
blackArrow.addEventListener("click", scrollTwo)

// ------------------------------------------------------------------------- //

// ------------DOM elements------------------------- //

const firstImage = document.querySelector("#first")
const secondImage = document.querySelector("#second")
const thirdImage = document.querySelector("#third")
const bookContainer = document.querySelector("#book-container")
const nameForm = document.querySelector("#username-form")
const h2 = document.querySelector("h2")
let name

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

    bookDiv.innerHTML = `
        <p>${book.title}</p>
        <p>by ${book.author}</p>
    `
    container.append(bookDiv)
}

function submitName(event) {
    event.preventDefault()
    name = nameForm.name.value
    h2.textContent = `come on in, ${name}`
    nameForm.reset()

    // I think we might have to do a post request here to also create a user in the back end
    // unless we just use this info to complete the review form, and then submit the username info along with the review form & create a user that way
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

nameForm.addEventListener("submit", submitName)


// ------------Initialize------------------------- //

fetchBooks()