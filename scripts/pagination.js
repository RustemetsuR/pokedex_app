
const paginationInput = document.getElementById("main-content-block__pagination-input");
paginationInput.value = 1;

const prevPageButton = document.getElementsByClassName("pagination-block__to-prev-page-button");
const nextPageButton = document.getElementsByClassName("pagination-block__to-next-page-button");

const toNextPage = async () => {
    pokemonContainer.innerHTML = loader;
    if (pokemonList.next !== null) {
        ++paginationInput.value;
        await toSpecificPage();
    }
    unlockPrevButtons();
}

const toPreviousPage = async () => {
    pokemonContainer.innerHTML = loader;
    if (pokemonList.previous !== null) {
        --paginationInput.value;
        unlockNextButtons();
        if (paginationInput.value == 1) {
            lockPrevButtons();
        }
        await toSpecificPage();
    } else {
        lockPrevButtons();
        unlockNextButtons();
    }
}

const toFirstPage = () => {
    pokemonContainer.innerHTML = loader;
    paginationInput.value = 1;
    lockPrevButtons();
    unlockNextButtons();
    getPokemons();
}

const toLastPage = async () => {
    pokemonContainer.innerHTML = loader;
    const lastPageOffset = pokemonList.count - pokemonLimit;
    paginationInput.value = Math.round(pokemonList.count / pokemonLimit);
    unlockPrevButtons();
    lockNextButtons();
    await getPokemons("https://pokeapi.co/api/v2/pokemon/?offset=" + lastPageOffset + "&limit=" + pokemonLimit);
}

const toSpecificPage = async () => {
    pokemonContainer.innerHTML = loader;
    if (paginationInput.value > 0) {
        const pageOffset = (paginationInput.value - 1) * pokemonLimit;
        await getPokemons("https://pokeapi.co/api/v2/pokemon/?offset=" + pageOffset + "&limit=" + pokemonLimit);
    }
}

const lockNextButtons = () => {
    nextPageButton[0].setAttribute("disabled", "");
    nextPageButton[1].setAttribute("disabled", "");
}


const lockPrevButtons = () => {
    prevPageButton[0].setAttribute("disabled", "");
    prevPageButton[1].setAttribute("disabled", "");
}


const unlockNextButtons = () => {
    nextPageButton[0].removeAttribute("disabled", "");
    nextPageButton[1].removeAttribute("disabled", "");
}

const unlockPrevButtons = () => {
    prevPageButton[0].removeAttribute("disabled", "");
    prevPageButton[1].removeAttribute("disabled", "");
}