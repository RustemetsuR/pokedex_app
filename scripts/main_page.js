const pokemonContainer = document.getElementById("pokemon-list-block");

let pokemonLimit = 10;
let ascOrder = true;
let pokemonID = 0;
let pokemonList;
let pokemonArr = [];

const localStorageArr = JSON.parse(window.localStorage.getItem("pokemons")) ? [...JSON.parse(window.localStorage.getItem("pokemons"))] : [];

const getPokemons = async (url = apiUrl + "pokemon/?limit=" + pokemonLimit) => {
    let res;
    pokemonContainer.innerHTML = loader;
    try{
        const pokemonsUrl = url;
        res = await fetch(pokemonsUrl);
        pokemonList = await res.json();
        pokemonArr = [];
        for (let i = 0; i < pokemonList.results.length; i++) {
            const pokemonUrl = pokemonList.results[i].url;
            const pokeRes = await fetch(pokemonUrl);
            const pokemonInfo = await pokeRes.json();
            pokemonArr.push(pokemonInfo);
        }
    
        if (!ascOrder) {
            pokemonArr.reverse();
        }
        
        pokemonContainer.innerHTML = "";
        displayCards();
    }catch(error){
        pokemonContainer.innerHTML = '<h3 class="error-message">Error: ' + res.status + '</h3>';
    }
}

const saveToLocalStorage = (pokemonInfo) => {
    localStorageArr.push(pokemonInfo);
    window.localStorage.setItem("pokemons", JSON.stringify(localStorageArr));
}

const deleteFromLocalStorage = (index) => {
    localStorageArr.splice(index, 1);
    window.localStorage.setItem("pokemons", JSON.stringify(localStorageArr));
}

const displayCards = (array = pokemonArr) => {
    const pokemonList = array.map((pokemon, index) => {
        const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const elementPos = localStorageArr.map(function (x) { return x.id; }).indexOf(pokemon.id);
        return `<div class="pokemon-card ${pokemon.types[0].type.name}" key=${index}>
                    <a class="pokemon-card__link" id="pokemon-card__link" href="pokemon_info.html?${pokemon.id}">
                        <img 
                            class="pokemon-card__img" 
                            src=${pokemon.sprites.front_default !== null ? pokemon.sprites.front_default : "../img/pokeball.png"}
                            style="${pokemon.sprites.front_default === null ? "padding:30px" : ""}">
                        <p class="pokemon-card__id">#${pokemon.id}</p>
                        <h3 class="pokemon-card__name">${name}</h3>
                    </a>
                    <div class="pokemon-card__types-block">
                        ${pokemon.types.map((type) => {
                            return `<button ${document.title == "Pokemon Info" ? "disabled" : ""} onclick="searchByTypes('${type.type.name}')" class="pokemon-card__types ${type.type.name}"> 
                                        <img class="pokemon-card__types-img" src="../img/${type.type.name}.png"/>
                                        <p class="pokemon-card__types-name">
                                            ${nameToUpperCase(type.type.name)}
                                        </p>
                                    </button>`
        }).join("")}
                    </div>
                    <button class="pokemon-card__favorite ${elementPos !== -1 ? "active" : ""}" id="${pokemon.id}"></button>
                </div>`;
    })
    pokemonContainer.innerHTML = pokemonList.join("");
    array.map((pokemon) => {
        const addButton = document.getElementById(pokemon.id);
        const elementPos = localStorageArr.map(function (x) { return x.id; }).indexOf(pokemon.id);
        let bool = elementPos !== -1;
        addButton.addEventListener("click", () => {
            if (bool) {
                deleteFromLocalStorage(elementPos);
            } else {
                saveToLocalStorage(pokemon);
            }
            bool = !bool;
            addButton.classList.toggle("active");
        })
    })
}

const searchPokemon = async (name) => {
    pokemonContainer.innerHTML = loader;
    document.getElementById("main-content-block__search-input").value = name;
    const isEmpty = str => !str.trim().length;
    if (isEmpty(name)) {
        await getPokemons();
    } else {
        try {
            const pokemonsUrl = apiUrl + "pokemon/" + name.toLowerCase();
            const res = await fetch(pokemonsUrl);
            pokemonInfo = await res.json();
            pokemonArr = [];
            pokemonArr.push(pokemonInfo);
            pokemonContainer.innerHTML = "";
            displayCards();
        } catch (e) {
            pokemonContainer.innerHTML = '<p class="">There is no pokemon called ' + name + '</p>';
        }
    }
}

const changeMaximumListItems = async () => {
    const perPageInput = document.getElementById("main-content-per-page-input");
    const value = perPageInput.value;

    if (value >= 10 && value <= 100) {
        pokemonContainer.innerHTML = loader;
        pokemonLimit = value;
        const pageOffset = (paginationInput.value - 1) * pokemonLimit;
        if(pageOffset < 0){
            pageOffset = 0;
        }
        await getPokemons("https://pokeapi.co/api/v2/pokemon/?offset=" + pageOffset + "&limit=" + pokemonLimit);
    }
}

const changeOrder = () => {
    pokemonArr.reverse();
    pokemonContainer.innerHTML = "";
    displayCards();
}


const searchByTypes = async (type) => {
    let res;
    pokemonContainer.innerHTML = loader;
    try{
        const pokemonsUrl = apiUrl + "type/" + type;
        res = await fetch(pokemonsUrl);
        const typeInfo = await res.json();
        pokemonArr = [];
        const pokemonArrayByTypes = typeInfo.pokemon;
        for (let i = 0; i < pokemonArrayByTypes.length; i++) {
            const pokemonUrl = pokemonArrayByTypes[i].pokemon.url;
            const pokeRes = await fetch(pokemonUrl);
            const pokemonInfo = await pokeRes.json();
            pokemonArr.push(pokemonInfo);
        }
    
        if (!ascOrder) {
            pokemonArr.reverse();
        }
        pokemonContainer.innerHTML = "";
        displayCards();
    }catch(e){
        pokemonContainer.innerHTML = '<h3 class="error-message">Error: ' + res.status + '</h3>';
    }
}

if (document.title == "Home") {
    getPokemons();
}