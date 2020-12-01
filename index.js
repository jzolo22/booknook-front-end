
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