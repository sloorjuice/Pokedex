import PokeCard from "../components/PokeCard"
import { useState, useEffect } from "react"
import { getAllPokemonNames, searchPokemon, getRandomPokemonList } from "../services/api"
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [pokemons, setPokemon] = useState([])  
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [allPokemonNames, setAllPokemonNames] = useState([]); // Store all Pokémon names

    useEffect(() => {
        const loadRandomPokemon = async () => {
            try {
                const randomPokemon = await getRandomPokemonList();
                setPokemon([...pokemons, ...randomPokemon]); // Correctly update state
                console.log(randomPokemon);
            } catch (err) {
                console.log(err);
                setError("Failed to load Pokémon...");
            } finally {
                setLoading(false);
            }
        };

        const fetchAllPokemonNames = async () => {
            try {
                const names = await getAllPokemonNames();
                setAllPokemonNames(names); // Store the full list of Pokémon names
            } catch (err) {
                console.log(err);
                setError("Failed to fetch Pokémon names...");
            }
        };

        loadRandomPokemon();
        fetchAllPokemonNames();
    }, []);
    
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;
    
        setLoading(true);
        try {
            // Filter Pokémon names that start with the search query
            const filteredNames = allPokemonNames.filter((pokemon) =>
                pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
            );

            // Fetch details for the filtered Pokémon
            const searchResults = await Promise.all(
                filteredNames.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
            );

            setPokemon(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search Pokémon...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for pokemon..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {console.log(pokemons)}
                    {console.log('Pokemons:', pokemons)}
                    {pokemons.map((pokemon) => (
                        <PokeCard pokemon={pokemon} key={pokemon.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;