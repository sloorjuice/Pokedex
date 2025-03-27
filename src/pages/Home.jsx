import PokeCard from "../components/PokeCard";
import { useState, useEffect, useRef } from "react";
import { getAllPokemonNames, searchPokemon, getRandomPokemonList } from "../services/api";
import "../css/Home.css";
import BackToTop from "../components/BackToTop";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [pokemons, setPokemon] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allPokemonNames, setAllPokemonNames] = useState([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false); // For endless scrolling
    const observerRef = useRef(null);

    useEffect(() => {
        const loadRandomPokemon = async () => {
            try {
                const randomPokemon = await getRandomPokemonList();
                setPokemon((prev) => [...prev, ...randomPokemon]); // Append new Pokémon
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

    // Load more Pokémon when the user scrolls to the bottom
    const loadMorePokemon = async () => {
        if (isFetchingMore) return; // Prevent duplicate fetches
        setIsFetchingMore(true);
        try {
            const randomPokemon = await getRandomPokemonList();
            setPokemon((prev) => [...prev, ...randomPokemon]); // Append new Pokémon
        } catch (err) {
            console.log(err);
            setError("Failed to load more Pokémon...");
        } finally {
            setIsFetchingMore(false);
        }
    };

    // Set up IntersectionObserver for endless scrolling
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMorePokemon();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, []);

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

            {isFetchingMore && <div className="loading">Loading more Pokémon...</div>}

            {/* Hidden div to trigger endless scrolling */}
            <div ref={observerRef} style={{ height: "1px" }}></div>

            <BackToTop />
        </div>
    );
}

export default Home;