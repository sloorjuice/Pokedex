const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
 
export const getRandomPokemon = async () => {
    let randomPokemon = Math.floor(Math.random() * 1025);
    console.log(`${BASE_URL}${randomPokemon}`)
    randomPokemon = randomPokemon.toString()
    const response = await fetch(`${BASE_URL}${randomPokemon}`);
    const data = await response.json();

    return data;
};

export const getRandomPokemonList = async () => {
  let pokemonsList = [];
  for (let i = 0; i < 20; i++){

    let randomPokemon = Math.floor(Math.random() * 1025);
    console.log(`${BASE_URL}${randomPokemon}`)
    randomPokemon = randomPokemon.toString()
    const response = await fetch(`${BASE_URL}${randomPokemon}`);
    const data = await response.json();
    pokemonsList.push(data)
  }
  pokemonsList = JSON.parse(JSON.stringify(pokemonsList));

  return pokemonsList;
};

export const getAllPokemonNames = async () => {
  const response = await fetch(`${BASE_URL}?limit=100000`);
  const data = await response.json();
  return data.results; // Returns an array of { name, url }
};
 
export const searchPokemon = async (query) => {
  const response = await fetch(`${BASE_URL}${query}`);
  const data = await response.json();

  // Return the full Pokémon object instead of `data.results`
  return data;
};
 
export const loadPokemon = async (pokemon) => {
  const url = `${BASE_URL}${pokemon}`
  const response = await fetch(url)
  const data = await response.json();
  return data
}