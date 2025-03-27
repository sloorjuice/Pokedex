import React, { useEffect, useState } from "react";
import "../css/All.css";
import PokeCard from "../components/PokeCard";

function AZ() {
    const [pokemonList, setPokemonList] = useState([]);

    // Fetch all Pokémon data and sort them alphabetically
    useEffect(() => {
        async function fetchPokemonList() {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
            const data = await response.json();
            const sortedPokemon = data.results.sort((a, b) => a.name.localeCompare(b.name));
            const detailedPokemon = await Promise.all(
                sortedPokemon.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    return await res.json();
                })
            );
            setPokemonList(detailedPokemon);
        }

        fetchPokemonList();
    }, []);

    return (
        <div className="all-page">
            <h1>Pokémon A-Z</h1>
            <div className="movies-grid">
                {pokemonList.map((pokemon) => (
                    <PokeCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
}

export default AZ;