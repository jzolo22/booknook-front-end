
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

// ------------Fetch functions------------------------- //


fetch("http://localhost:3000/books/1")
.then(response => response.json())
.then(book => {
    renderOneBookCover(book)
    console.log(book.image_url)
})

// ------------Render functions------------------------- //


function renderOneBookCover(book) {
    firstImage.src = book.image_url
    firstImage.alt = book.title
    firstImage.dataset.id = book.id
}

function renderBookInfoDiv(book, container) {
    const bookDiv = document.createElement("div")

    // const title = document.createElement("h3")
    bookDiv.innerHTML = `
        <h3>${book.title}</h3>
        <h4>${book.author}</h4>
        <p>${book.description}</p>
    `
    // bookDiv.append(title, )
    container.append(bookDiv)
}

// ------------Event Listener------------------------- //
bookContainer.addEventListener("click", event => {
    if (event.target.tagName === "IMG") {
        const id = event.target.dataset.id 
        const flexItem = event.target.closest("div")
        console.log(flexItem)

        if (flexItem.childElementCount === 1) {
            fetch(`http://localhost:3000/books/${id}`)
                .then(r => r.json())
                .then(bookObj => renderBookInfoDiv(bookObj, flexItem))
        } else {
            // debugger
            const div = flexItem.querySelector("div")
            flexItem.removeChild(div)
        }


        // fetch to that id
        // create a div 
        // append it to the flex item
    }
})