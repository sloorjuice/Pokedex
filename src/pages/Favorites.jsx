import React from "react";
import { usePokeContext } from "../context/PokeContext";
import PokeCard from "../components/PokeCard";
import "../css/Favorites.css";

function Favorites() {
  const { favorites } = usePokeContext();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorites Yet</h2>
        <p>Add some Pokémon to your favorites to see them here!</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Your Favorite Pokémon</h2>
      <div className="movies-grid">
        {favorites.map((pokemon) => (
          <PokeCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;