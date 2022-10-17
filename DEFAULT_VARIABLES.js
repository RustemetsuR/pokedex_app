const apiUrl = "https://pokeapi.co/api/v2/";
const loader = `<div class="pokeball"></div>`;

const nameToUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const hamburger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");

hamburger.addEventListener("click", () =>{
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
});

document.querySelectorAll(".header__nav-list-links").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("active");
}))