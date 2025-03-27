import { useParams } from "react-router-dom";
import { loadPokemon } from "../services/api";
import { useEffect, useState } from "react";
import { usePokeContext } from "../context/PokeContext"; // Import context
import "../css/PokeDetail.css";

function PokemonDetail() {
    let params = useParams();
    const pokeId = params.pokeID;

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState(null);

    const { isFavorite, addToFavorites, removeFromFavorites } = usePokeContext(); // Use context
    const favorite = pokemon ? isFavorite(pokemon.id) : false; // Check if Pokémon is a favorite

    useEffect(() => {
        const loadCurrentPokemon = async () => {
            try {
                const myPokemon = await loadPokemon(pokeId);
                setPokemon(myPokemon);
            } catch (err) {
                console.log(err);
                setError("Failed to load Pokémon...");
            } finally {
                setLoading(false);
            }
        };

        loadCurrentPokemon();
    }, [params]);

    const handleFavoriteClick = () => {
        if (favorite) {
            removeFromFavorites(pokemon.id);
        } else {
            addToFavorites(pokemon);
        }
    };

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : pokemon ? (
                <div className="banner-container">
                    <img
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        alt={pokemon.name}
                        className="banner"
                    />
                    <div className="content">
                        <h1>{pokemon.name.replace(/-/g, " ")}</h1> {/* Replace hyphens with spaces */}
                        <p>Type: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
                        <p>Height: {pokemon.height / 10} m</p>
                        <p>Weight: {pokemon.weight / 10} kg</p>
                        <button
                            className={`favorite-btn ${favorite ? "active" : ""}`}
                            onClick={handleFavoriteClick}
                        >
                            {favorite ? "♥" : "♡"}
                        </button>
                    </div>
                </div>
            ) : (
                <h1>Pokémon not found</h1>
            )}
        </>
    );
}

export default PokemonDetail;