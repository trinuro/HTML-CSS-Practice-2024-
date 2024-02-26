// Initialise constants for important elements
const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonImage = document.getElementById("pokemon-img");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const shinyBtn = document.getElementById("toggle-shiny");

const pokeAPIAddress = "https://pokeapi-proxy.freecodecamp.rocks/";

// function to fetch information from API, updatePokemonInformation, toggle shiny image, store in local storage

const fetchPokemonInformation = (id) => {
  if(Number(id)){
    // convert all number id to string
    id = String(id);
  }
  fetch(`${pokeAPIAddress}api/pokemon/${id.toLowerCase()}`) // fetch information from this api
  .then((res)=>res.json()) // covert response object into json format
  .then((data)=>{
    updatePokemonInformation(data);
  })
  .catch((err)=>{
    alert("Pokémon not found") // catch error
    console.log(err);
  })
}


const updatePokemonInformation = (response) =>{
  const {id, name, sprites, weight, height, stats: rawStats, types: rawTypes} = response;
  const {front_default, front_shiny} = sprites;
  // Store sprites in local storage
  localStorage.setItem("pokemonSprites", JSON.stringify([
    front_default, front_shiny
  ]))


  const usableStats = {};
  // Assign values to each stat
  rawStats.forEach(({base_stat, stat})=>{
    usableStats[stat.name] = base_stat;
  })

  const types = rawTypes.map((slot)=>slot.type.name); // types variable will store all possible types of pokemon

  // This section outputs content to the web page.
  pokemonName.textContent = name.toUpperCase();
  console.log(name);
  pokemonId.textContent = `#${id}`;
  setPokemonImage(name, front_default);
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;
  pokemonTypes.innerHTML = "";
  types.forEach((type)=>{
    pokemonTypes.innerHTML += `<p class="pokemon-type ${type}">${type}</p>`
  })
  pokemonHp.textContent = usableStats.hp;
  pokemonAttack.textContent = usableStats.attack;
  pokemonDefense.textContent = usableStats.defense;
  pokemonSpecialAttack.textContent = usableStats["special-attack"];
  pokemonSpecialDefense.textContent = usableStats["special-defense"];
  pokemonSpeed.textContent = usableStats["speed"];
  
}

const setPokemonImage = (name, url) =>{
    pokemonImage.innerHTML = `<img src="${url}" alt="${name} front_default" class="image" id="sprite"/>`;
  } 

// function to get shiny image
const toggleShiny = () => {
  const sprites = JSON.parse(localStorage.getItem("pokemonSprites"));
  const image = document.querySelector("#pokemon-img img");
  image.src = image.src === sprites[0] ? sprites[1] : sprites[0];

}

searchBtn.addEventListener("click", ()=>{
  fetchPokemonInformation(userInput.value);
})

fetchPokemonInformation(1);

userInput.addEventListener("keydown", (e)=>{
  if(e.key==="Enter"){
    fetchPokemonInformation(userInput.value);
  }
  
})

shinyBtn.addEventListener("click", ()=>{
  if(pokemonName.textContent === ""){
    alert("Choose a pokemon first");
    return;
  }
  toggleShiny();
})
