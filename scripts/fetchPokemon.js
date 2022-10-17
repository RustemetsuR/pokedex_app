let front = true;
let defaultSkin = true;
let img;
let pokemon;
let species;
const pokemonBlock = document.getElementById('pokemon-info-block');

const getPokemonInfo = async (string, id) => {
    const pokemonUrl = apiUrl + string + id;
    const res = await fetch(pokemonUrl);
    return await res.json();
}

const createPokemonBlock = async () => {
    const id = location.search.substring(1);
    pokemon = await getPokemonInfo("pokemon/", id);
    const name = nameToUpperCase(pokemon.name);
    const img = pokemon.sprites.front_default;
    const shiny = pokemon.sprites.front_shiny;
    const back = pokemon.sprites.back_default;
    const height = pokemon.height;
    const types = pokemon.types;
    const experience = pokemon.base_experience;

    var str = '<div class="pokemon__types-block">'

    types.forEach(function (type) {
        str += '<div class="pokemon__types"> <img class="pokemon__types-img" src="../img/'
            + type.type.name
            + '.png"> <p class="pokemon__types-name">'
            + nameToUpperCase(type.type.name)
            + '</p> </div>';
    });

    str += '</div>';

    const pokeHTML = `
                <div class="pokemon ${types[0].type.name}">
                    <div class="pokemon__img-block pokemon__element">
                        <img class="pokemon__img" id="pokemon__img" src=${img !== null ? img : "../img/pokeball.png"}>
                    </div>
                    <div class="pokemon__main-info pokemon__element">
                        <p class="pokemon__id">Pokedex Number: #${id}</p>
                        <h3 class="pokemon__name">Name: ${name}</h3>
                        <p class="pokemon__height">Height: ${height}</p>
                        <p ${experience === null ? "style=display:none" : ""} class="pokemon__xp">Base experience: ${experience}</p>
                        <div class="pokemon-card__types-block">
                        Types:
                        ${types.map((type) => {
                            return `<div class="pokemon-card__types ${type.type.name}"> 
                                                        <img class="pokemon-card__types-img" src="../img/${type.type.name}.png"/>
                                                        <p class="pokemon-card__types-name">
                                                            ${nameToUpperCase(type.type.name)}
                                                        </p>
                                                    </div>`
                        }).join("")}
                        </div>
                    </div>
                    <div class="pokemon__img-switch">
                       <button onclick="showShiny()" ${shiny === null ? "style=display:none" : ""} class="shiny-switcher pokemon__img-switchers" id="shiny-switcher">
                                    <svg style="color:#fff"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>
                        </button>
                        <button onclick="showBack()" ${back === null ? "style=display:none" : ""} class="reverse-switcher pokemon__img-switchers" id="reverse-switcher">
                            <svg style="color:#fff" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path  stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                            </svg>
                        </button>
                    </div>
                </div>
    `;
    pokemonBlock.innerHTML = pokeHTML;
}

const showShiny = () => {
    let pokemonImg = document.getElementById("pokemon__img");
    defaultSkin = !defaultSkin;
    if (!defaultSkin) {
        front ?
            pokemonImg.setAttribute("src", pokemon.sprites.front_shiny) :
            pokemonImg.setAttribute("src", pokemon.sprites.back_shiny);
    } else {
        front ?
            pokemonImg.setAttribute("src", pokemon.sprites.front_default) :
            pokemonImg.setAttribute("src", pokemon.sprites.back_default);
    }
}

const showBack = () => {
    let pokemonImg = document.getElementById("pokemon__img");
    front = !front;
        if (!front) {
            defaultSkin ?
                pokemonImg.setAttribute("src", pokemon.sprites.back_default) :
                pokemonImg.setAttribute("src", pokemon.sprites.back_shiny);
        } else {
            defaultSkin ?
                pokemonImg.setAttribute("src", pokemon.sprites.front_default) :
                pokemonImg.setAttribute("src", pokemon.sprites.front_shiny);
        }
}

pokemonBlock.innerHTML = loader;
createPokemonBlock();
