
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

fetch("http://localhost:3000/books/941")
.then(response => response.json())
.then(book => {
    renderOneBookCover(book)
    console.log(book.image_url)
})

const firstImage = document.querySelector("#first")
const secondImage = document.querySelector("#second")
const thirdImage = document.querySelector("#third")
console.log(firstImage)
console.log(firstImage.src)

function renderOneBookCover(book) {
    
    firstImage.src = book.image_url
    firstImage.alt = book.title
    

}