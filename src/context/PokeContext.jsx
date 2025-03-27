import { createContext, useEffect, useContext, useState } from "react";

const PokeContext = createContext();

export const usePokeContext = () => useContext(PokeContext);

export const PokeProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage on initial render
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (pokemon) => {
        setFavorites((prev) => [...prev, pokemon]);
    };

    const removeFromFavorites = (pokeId) => {
        setFavorites((prev) => prev.filter((pokemon) => pokemon.id !== pokeId));
    };

    const isFavorite = (pokeId) => {
        return favorites.some((pokemon) => pokemon.id === pokeId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };

    return (
        <PokeContext.Provider value={value}>
            {children}
        </PokeContext.Provider>
    );
};