
// ---------------------------Page Scroll--------------------------------- //

const whiteArrow = document.querySelector(".arrow.down")
const blackArrow = document.querySelector("#book-arrow")


const scroll = () => {
    const pageTwo = document.querySelector(".bg2");
    pageTwo.scrollIntoView({behavior: "smooth"});
}

const moreBooks = () => {
    fetch(`${url}/books`)
        .then(r => r.json())
        .then(bookArray => {
            const newArray = bookArray.slice(0, 12)
            newArray.forEach(book => {
                if (!allBookIds.includes(book.id)){
                    renderOneBookCover(book)
                    allBooksArray.push(book)
                    allBookIds.push(book.id)
                }
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
const bookDetail = document.querySelector("#book-detail")
const pageThree = document.querySelector("#page-three")
const titleSort = document.querySelector("#title-sort")
const sortDropdown = document.querySelector("#sort")
let reviewId

// ------------Fetch Functions------------------------- //

const url = "https://bknk.herokuapp.com/"
let allBooksArray = []
let allBookIds = []

function fetchBooks () {
    fetch(`${url}/books`)
        .then(r => r.json())
        .then(bookArray => {
            const firstTwelveArray = bookArray.slice(0, 12)
            bookContainer.innerHTML = ""
            firstTwelveArray.forEach(book => {
                renderOneBookCover(book)
                allBooksArray.push(book)
                allBookIds.push(book.id)
                
            })
        })
}

function fetchBook(id) {
    return fetch(`${url}/books/${id}`)
        .then(r => r.json())
}

// ------------Render Functions------------------------- //

function renderOneBookCover({image_url, title, id}) {
    const newBookDiv = document.createElement("div")
    newBookDiv.className = "flex-item"
    const image = document.createElement("img")
    image.classList.add("hvr-float-shadow")
    image.src = image_url
    image.alt = title
    image.dataset.id = id

    newBookDiv.append(image)
    bookContainer.append(newBookDiv)
}

function renderBookInfoDiv({id, title, author}, container) {
    const bookDiv = document.createElement("div")
    bookDiv.dataset.id = id
    bookDiv.innerHTML = `
        <p>${title}</p>
        <p>by ${author}</p>
        <a href="#add-book-form" id="more-details">more details</a>
    `
    container.append(bookDiv)
}

function formFill({title, author, genre, image_url, year, description, id}) {
    editBookForm.title.value = title
    editBookForm.author.value = author
    editBookForm.genre.value = genre
    editBookForm.image_url.value = image_url
    editBookForm.year.value = year 
    editBookForm.description.value = description
    editBookForm.dataset.id = id
}


function renderReview(review) {
    const reviewDiv = document.createElement("div")
    reviewDiv.dataset.id = review.id

    const editButton = document.createElement("button")
    editButton.dataset.id = review.id
    editButton.id = "edit-button"
    editButton.textContent = "edit"
    editButton.classList.add("trigger")
    if (name != review.username) {
        editButton.disabled = true
    }

    const deleteButton = document.createElement("button")
    deleteButton.dataset.id = review.id
    deleteButton.id = "delete-button"
    if (name != review.username) {
        deleteButton.disabled = true
    }

    deleteButton.textContent = "delete"
    reviewDiv.textContent =`"${review.comment}" -${review.username}`
    reviewBox.append(reviewDiv, editButton, deleteButton)
}

function renderUpdatedReview({id, comment, username}) {
    const reviewDiv = reviewBox.querySelector(`div[data-id="${id}"]`)
    reviewDiv.textContent =`"${comment}" -${username}`
}

// ------------Event Handler Functions------------------------- //

const toggleBookInfoDiv = ({target: element}) => {
    if (element.tagName === "IMG") {
        const id = element.dataset.id 
        const flexItem = element.closest("div")

        if (flexItem.childElementCount === 1) {
            fetchBook(id)
                .then(bookObj => renderBookInfoDiv(bookObj, flexItem))
        } else {
            const div = flexItem.querySelector("div")
            flexItem.removeChild(div)
        }
    }
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

const moreDetailsClick = (event) => {
    if (event.target.id === "more-details") {
        const editId = parseInt(event.target.parentElement.dataset.id)

        pageThree.scrollIntoView()

        fetchBook(editId)
            .then(bookObject => {
                bookDetail.style.overflow = "auto"
                bookDetail.innerHTML = ""
                bookDetail.innerHTML = `
                <img src=${bookObject.image_url}>
                <h3>${bookObject.title}</h3>
                <h5>by ${bookObject.author}</h5>
                <h5>published: ${bookObject.year}</h5>
                <p>${bookObject.description}</p>`


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
    
    fetch(`${url}/books/${editFormId}`, {
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
                bookDetail.innerHTML = ""
                bookDetail.innerHTML = `
                <img src=${bookObject.image_url}>
                <h3>${bookObject.title}</h3>
                <h5>${bookObject.author}</h5>
                <h5>${bookObject.year}</h5>
                <p>${bookObject.description}</p>`
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
    
    fetch(`${url}/reviews`, {
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
    if (event.target.matches("#edit-button")) {
//         addReviewDiv.style.display = "none"
//         editReviewDiv.style.display = "block"
        reviewId = parseInt(event.target.dataset.id)
        fetch(`${url}/reviews/${reviewId}`)
            .then(r => r.json())
            .then(reviewObject => {
                editReviewForm.title.value = reviewObject.title
                editReviewForm.rating.value = reviewObject.rating
                editReviewForm.review.value = reviewObject.comment
                editReviewForm.recommend.value = reviewObject.recommend
            })
    } else if (event.target.matches("#delete-button")) {
        const id = parseInt(event.target.dataset.id)
        fetch(`${url}/reviews/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(r => r.json())

        const reviewDiv = document.querySelector(`div[data-id="${id}"]`)
        const button = document.querySelectorAll(`button[data-id="${id}"]`)
        
        button.forEach(button => {
            button.remove()
        })
        reviewDiv.remove()
    }
}


const sortByTitle = event => {
    switch (event.target.value) {
        case "title":
            allBooksArray.sort(function (a, b) {
                const titleA = a.title 
                const titleB = b.title 
                return titleA.localeCompare(titleB)
            })
            bookContainer.innerHTML = ""
            allBooksArray.forEach(book => {
                renderOneBookCover(book)
            })
            break

        case "author":
            allBooksArray.sort(function (a, b) {
                const nameA = a.author.split(" ")
                const nameB = b.author.split(" ")
                const lastNameA = nameA[1]
                const lastNameB = nameB[1]
                const authorA =  lastNameA
                const authorB = lastNameB 
                return authorA.localeCompare(authorB)
            })
            bookContainer.innerHTML = ""
            allBooksArray.forEach(book => {
                renderOneBookCover(book)
            })
            break

        case "num-reviews":
            allBooksArray.sort(function (a, b) {
                return b.reviews.length - a.reviews.length
            })

            bookContainer.innerHTML = ""
            allBooksArray.forEach(book => {
                renderOneBookCover(book)
            })
            break

        case "release-date-new":
            allBooksArray.sort(function (a, b) {
                const dateA = new Date (a.year)
                const dateB = new Date (b.year)
                    return dateB - dateA
            })

            bookContainer.innerHTML = ""
            allBooksArray.forEach(book => {
                renderOneBookCover(book)
            })
            break

        case "release-date-old":
            allBooksArray.sort(function (a, b) {
                const dateA = new Date (a.year)
                const dateB = new Date (b.year)
                    return dateA - dateB
            })

            bookContainer.innerHTML = ""
            allBooksArray.forEach(book => {
                renderOneBookCover(book)
            })
            break
    } 
}

// ------------Event Listener------------------------- //
bookContainer.addEventListener("click", toggleBookInfoDiv)

document.body.addEventListener("click", moreDetailsClick)

editReviewForm.addEventListener("submit", submitEditReviewForm)

editForm.addEventListener("submit", submitEditBookForm)

reviewForm.addEventListener("submit", submitReviewForm)

reviewBox.addEventListener("click", editOrDeleteReview)

// titleSort.addEventListener("click", sortByTitle)

sortDropdown.addEventListener("change", sortByTitle)


// ------------Initialize------------------------- //

fetchBooks()