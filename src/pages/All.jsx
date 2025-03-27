import React, { useEffect, useState } from "react";
import "../css/All.css";
import PokeCard from "../components/PokeCard";

function AZ() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("all");
    const [sortOption, setSortOption] = useState("name");

    // Fetch all Pokémon data and types
    useEffect(() => {
        async function fetchPokemonList() {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
            const data = await response.json();
            const detailedPokemon = await Promise.all(
                data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    return await res.json();
                })
            );
            setPokemonList(detailedPokemon);
            setFilteredPokemon(detailedPokemon);
        }

        async function fetchTypes() {
            const response = await fetch("https://pokeapi.co/api/v2/type");
            const data = await response.json();
            setTypes(data.results.map((type) => type.name));
        }

        fetchPokemonList();
        fetchTypes();
    }, []);

    // Filter Pokémon by type
    useEffect(() => {
        let filtered = pokemonList;

        if (selectedType !== "all") {
            filtered = pokemonList.filter((pokemon) =>
                pokemon.types.some((type) => type.type.name === selectedType)
            );
        }

        // Sort the filtered Pokémon
        if (sortOption === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "type") {
            filtered.sort((a, b) => {
                const typeA = a.types[0]?.type.name || "";
                const typeB = b.types[0]?.type.name || "";
                return typeA.localeCompare(typeB);
            });
        } else if (sortOption === "id") {
            filtered.sort((a, b) => a.id - b.id);
        }

        setFilteredPokemon(filtered);
    }, [selectedType, sortOption, pokemonList]);

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <div className="all-page">
            <h1>Pokémon A-Z</h1>

            {/* Filter and Sort Options */}
            <div className="filter-sort-container">
                <select value={selectedType} onChange={handleTypeChange} className="filter-dropdown">
                    <option value="all">All Types</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>

                <select value={sortOption} onChange={handleSortChange} className="sort-dropdown">
                    <option value="name">Sort by Name</option>
                    <option value="type">Sort by Type</option>
                    <option value="id">Sort by ID</option>
                </select>
            </div>

            <div className="movies-grid">
                {filteredPokemon.map((pokemon) => (
                    <PokeCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
}

export default AZ;