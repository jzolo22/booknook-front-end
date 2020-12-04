// const closeButton = document.querySelector("#close-btn")
// const addBookForm = document.querySelector("#add-book-form")
// const openButton = document.querySelector("#open-btn")


// closeButton.addEventListener("click", event => {
//     addBookForm.style.display = "none"
// })


// const click = () => {
//     console.log("addBookForm")
//     addBookForm.style.display = "block"
// }
// openButton.addEventListener("click", click)


/// review modal
const reviewModal = document.querySelector("#review-modal");
const reviewTrigger = document.querySelector("#review-open-btn");
const reviewCloseButton = document.querySelector("#review-close-button");

function reviewToggleModal() {
    reviewModal.classList.toggle("show-modal");
}

function reviewWindowOnClick(event) {
    if (event.target === reviewModal) {
        reviewToggleModal();
    }

    
}

reviewTrigger.addEventListener("click", reviewToggleModal);
reviewCloseButton.addEventListener("click", reviewToggleModal);
window.addEventListener("click", reviewWindowOnClick);


/// addbook modal

const addBookModal = document.querySelector("#add-book-modal");
const addTrigger = document.querySelector("#add-open-btn");
const addCloseButton = document.querySelector("#add-close-button");

function addBookToggleModal() {
    addBookModal.classList.toggle("show-modal");
}

function addBookWindowOnClick(event) {
    if (event.target === addBookModal) {
        addBookToggleModal();
    }

    
}

addTrigger.addEventListener("click", addBookToggleModal);
addCloseButton.addEventListener("click", addBookToggleModal);
window.addEventListener("click", addBookWindowOnClick);

//////edit book modal


const editBookModal = document.querySelector("#edit-book-modal");
const editBookTrigger = document.querySelector("#edit-book-open-btn");
const editCloseButton = document.querySelector("#edit-close-button");

function editBookToggleModal() {
    editBookModal.classList.toggle("show-modal");
}

function editBookWindowOnClick(event) {
    if (event.target === editBookModal) {
        editBookToggleModal();
    }

    
}

editBookTrigger.addEventListener("click", editBookToggleModal);
editCloseButton.addEventListener("click", editBookToggleModal);
window.addEventListener("click", editBookWindowOnClick);

///////edit review modal


const editReviewModal = document.querySelector("#edit-review-modal");
const editReviewTrigger = document.querySelector("#edit-button");
const editReviewCloseButton = document.querySelector("#review-close-button");

function editReviewToggleModal() {
    editReviewModal.classList.toggle("show-modal");
}

function editBookReviewWindowOnClick(event) {
    if (event.target === editReviewModal) {
        editReviewToggleModal();
    }

    
}

// editReviewTrigger.addEventListener("click", editReviewToggleModal);
editReviewCloseButton.addEventListener("click", editReviewToggleModal);
window.addEventListener("click", editBookReviewWindowOnClick);

document.body.addEventListener("click", event => {
    if (event.target.id === "edit-button") {
        editReviewToggleModal()

    }
    if (event.target.id === "review-close-button") {
        editReviewToggleModal()
    }
})