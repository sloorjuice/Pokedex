import PokeCard from "../components/PokeCard";
import { useState, useEffect } from "react";
import { getAllPokemonNames, searchPokemon, getRandomPokemonList } from "../services/api";
import "../css/Home.css";
import BackToTop from "../components/BackToTop";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [pokemons, setPokemon] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allPokemonNames, setAllPokemonNames] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]); // Store recent search queries

    useEffect(() => {
        const loadRandomPokemon = async () => {
            try {
                const randomPokemon = await getRandomPokemonList();
                setPokemon([...pokemons, ...randomPokemon]);
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
                setAllPokemonNames(names);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch Pokémon names...");
            }
        };

        loadRandomPokemon();
        fetchAllPokemonNames();
    }, []);

    const handleSearch = async (query) => {
        if (!query.trim()) {
            const randomPokemon = await getRandomPokemonList();
            setPokemon(randomPokemon);
            return;
        }

        setLoading(true);

        try {
            setSearchHistory((prevHistory) => {
                const updatedHistory = [query, ...prevHistory.filter((q) => q !== query)];
                return updatedHistory.slice(0, 5); // Limit to 5 recent searches
            });

            const filteredNames = allPokemonNames.filter((pokemon) =>
                pokemon.name.toLowerCase().startsWith(query.toLowerCase())
            );

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

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    return (
        <div className="home">
            <form className="search-form">
                <input
                    type="text"
                    placeholder="Search for Pokémon..."
                    className="search-input"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
            </form>

            <div className="search-history">
                <h4>Recent Searches</h4>
                <ul>
                    {searchHistory.map((query, index) => (
                        <li key={index} onClick={() => handleSearch(query)}>
                            {query}
                        </li>
                    ))}
                </ul>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {pokemons.map((pokemon) => (
                        <PokeCard pokemon={pokemon} key={pokemon.id} />
                    ))}
                </div>
            )}
            <BackToTop />
        </div>
    );
}

export default Home;