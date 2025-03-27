import { useParams } from "react-router-dom";
import { loadPokemon } from "../services/api";
import { useEffect, useState } from "react";
import "../css/PokeDetail.css";

function PokemonDetail() {
    let params = useParams();
    const pokeId = params.pokeID;

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState(null);

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
                        <h1>{pokemon.name}</h1>
                    </div>
                </div>
            ) : (
                <h1>Pokémon not found</h1>
            )}
        </>
    );
}

export default PokemonDetail;