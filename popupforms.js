const closeButton = document.querySelector("#close-btn")
const addBookForm = document.querySelector("#add-book-form")
const openButton = document.querySelector("#open-btn")


closeButton.addEventListener("click", event => {
    addBookForm.style.display = "none"
})


const click = () => {
    console.log("addBookForm")
    addBookForm.style.display = "block"
}
openButton.addEventListener("click", click)
