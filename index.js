
// ---------------------------Page Scroll--------------------------------- //

const whiteArrow = document.querySelector(".arrow.down")
const blackArrow = document.querySelector("#book-arrow")


const scroll = () => {
    const pageTwo = document.querySelector(".bg2");
    pageTwo.scrollIntoView({behavior: "smooth"});
}

const moreBooks = () => {
    fetch("http://localhost:3000/books")
        .then(r => r.json())
        .then(bookArray => {
            const newArray = bookArray.slice(0, 12)
            newArray.forEach(book => {
                renderOneBookCover(book)
            })
        })
}

whiteArrow.addEventListener("click", scroll)
blackArrow.addEventListener("click", moreBooks)

// ------------------------------------------------------------------------- //



// ------------DOM elements------------------------- //

const firstImage = document.querySelector("#first")
const secondImage = document.querySelector("#second")
const thirdImage = document.querySelector("#third")
const bookContainer = document.querySelector("#book-container")
const editBookForm = document.querySelector("#edit-book-form")
const editForm = document.querySelector("#edit-book-form")
const reviewForm = document.querySelector("#add-review-form")
const reviewBox = document.querySelector("#review-box")
const editReviewForm = document.querySelector("#edit-review-form")
const addReviewDiv = document.querySelector("#add-review-div")
const editReviewDiv = document.querySelector("#edit-review-div")
let reviewId

// ------------Fetch functions------------------------- //

const url = "http://localhost:3000"

function fetchBooks () {
    fetch(`${url}/books`)
        .then(r => r.json())
        .then(bookArray => {
            const newArray = bookArray.slice(0, 12)
            bookContainer.innerHTML = ""
            newArray.forEach(book => {
                renderOneBookCover(book)
            })
        })
}

function fetchBook(id) {
    return fetch(`${url}/books/${id}`)
    .then(r => r.json())
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

function renderReview(review) {
    const reviewDiv = document.createElement("div")
    reviewDiv.dataset.id = review.id

    const editButton = document.createElement("button")
    editButton.dataset.id = review.id
    editButton.id = "edit-button"
    editButton.textContent = "edit"

    const deleteButton = document.createElement("button")
    deleteButton.dataset.id = review.id
    deleteButton.id = "delete-button"
    deleteButton.textContent = "delete"

    reviewDiv.textContent =`"${review.comment}" -${review.username}`

    reviewBox.append(reviewDiv, editButton, deleteButton)
}

function renderUpdatedReview(newReview) {
    const reviewDiv = reviewBox.querySelector(`div[data-id="${newReview.id}"]`)
    reviewDiv.textContent =`"${newReview.comment}" -${newReview.username}`
}

const toggleBookInfoDiv = (event) => {
    if (event.target.tagName === "IMG") {
        const id = event.target.dataset.id 
        const flexItem = event.target.closest("div")

        if (flexItem.childElementCount === 1) {
            fetchBook(id)
                .then(bookObj => renderBookInfoDiv(bookObj, flexItem))
        } else {
            const div = flexItem.querySelector("div")
            flexItem.removeChild(div)
        }
    }
}

const moreDetailsClick = (event) => {
    if (event.target.id === "more-details") {
        const editId = parseInt(event.target.parentElement.dataset.id)
        
        if (addReviewDiv.style.display === "none") {
            addReviewDiv.style.display = "block"
        }
        if(editReviewDiv.style.display === "block") {
            editReviewDiv.style.display = "none"
        }
        
        fetchBook(editId)
            .then(bookObject => {
                formFill(bookObject)
                reviewForm.title.value = bookObject.title
                reviewForm.dataset.id = bookObject.id
                reviewBox.innerHTML = ""
                bookObject.reviews.forEach(review => {
                    renderReview(review)
            })
        })
    } 
}

const submitEditReviewForm = (event) => {
    event.preventDefault()
    
    const editedReviewObject = {
        comment: editReviewForm.review.value,
        recommend: editReviewForm.recommend.value,
        rating: parseInt(editReviewForm.rating.value),
    }

    fetch(`${url}/reviews/${reviewId}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(editedReviewObject)
    })
        .then(r => r.json())
        .then(updatedReview => {
            renderUpdatedReview(updatedReview)
        })
}

const submitEditBookForm = event => {
    event.preventDefault()

    const editFormId = parseInt(event.target.dataset.id)
    const bookDiv = document.querySelector(`div[data-id="${editFormId}"]`)

    const editedBook = {
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
        body: JSON.stringify(editedBook)
    })
            .then(r => r.json())
            .then(bookObject => {
                bookDiv.innerHTML = ""
                renderBookInfoDiv(bookObject, bookDiv)
            })
}

const submitReviewForm = (event) => {
    event.preventDefault()

    const reviewBookId = parseInt(reviewForm.dataset.id)
    const reviewObject = {
        comment: reviewForm.review.value,
        recommend: reviewForm.recommend.value,
        rating: parseInt(reviewForm.rating.value),
        user_id: userId,
        book_id: reviewBookId
    }

    fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(reviewObject)
    })
        .then(r => r.json())
        .then(review => {
            renderReview(review)
        } )

    event.target.reset()
}

const editOrDeleteReview = (event) => {
    if(event.target.matches("#edit-button")) {
        addReviewDiv.style.display = "none"
        editReviewDiv.style.display = "block"
        reviewId = parseInt(event.target.dataset.id)
        fetch(`http://localhost:3000/reviews/${reviewId}`)
        .then(r => r.json())
        .then(reviewObject => {
            editReviewForm.title.value = reviewObject.title
            editReviewForm.rating.value = reviewObject.rating
            editReviewForm.review.value = reviewObject.comment
            editReviewForm.recommend.value = reviewObject.recommend
        })

    } else if (event.target.matches("#delete-button")) {
        const id = parseInt(event.target.dataset.id)
        fetch(`http://localhost:3000/reviews/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(console.log)

        const reviewDiv = document.querySelector(`div[data-id="${id}"]`)
        const button = document.querySelectorAll(`button[data-id="${id}"]`)
        
        button.forEach(button => {
            button.remove()
        })
        reviewDiv.remove()
    }
}

// ------------Event Listener------------------------- //
bookContainer.addEventListener("click", toggleBookInfoDiv)

document.body.addEventListener("click", moreDetailsClick)

editReviewForm.addEventListener("submit", submitEditReviewForm)

editForm.addEventListener("submit", submitEditBookForm)

reviewForm.addEventListener("submit", submitReviewForm)

reviewBox.addEventListener("click", editOrDeleteReview)

// ------------Initialize------------------------- //

fetchBooks()