const pokContainer = document.getElementById("pokemon-list-block");
const getPokemonsFromLocalStorage = () => {
    const arr = JSON.parse(window.localStorage.getItem("pokemons"));
    pokContainer.innerHTML = "";
    if(arr.length === 0){
        pokContainer.innerHTML = '<h3 class="error-message">There is no pokemons in the stash. <a style="text-decoration: underline" href="index.html">Add some!</a> </h3>';
    }else{
        displayCards(arr);
    }
}

getPokemonsFromLocalStorage();