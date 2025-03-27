const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
 
export const getRandomPokemon = async () => {
    let random_pokemon = Math.floor(Math.random() * 1025);
    console.log(`${BASE_URL}${random_pokemon}`)
    random_pokemon = random_pokemon.toString()
    const response = await fetch(`${BASE_URL}${random_pokemon}`);
    const data = await response.json();

    return data;
};

export const getRandomPokemonList = async () => {
  let pokemon_list = [];
  while (pokemon_list.length < 50) {
    const data = await getRandomPokemon();

    // Check if the Pokémon is already in the list
    if (!pokemon_list.some(pokemon => pokemon.id === data.id)) {
      pokemon_list.push(data);
    }
  }
  return pokemon_list;
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