import "../css/PokeCard.css";
import { usePokeContext } from "../context/PokeContext";
import { Link } from "react-router-dom";

function PokeCard({ pokemon }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = usePokeContext();
    const favorite = isFavorite(pokemon.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(pokemon.id);
        else addToFavorites(pokemon);
    }

    const sprite = pokemon.sprites?.other?.['official-artwork']?.front_default || 'placeholder-image-url';
    const types = pokemon.types?.map((type) => type.type.name).join(', ') || 'Unknown';
    const formattedName = pokemon.name.replace(/-/g, ' ');

    return (
        <Link to={`/pokemon/${pokemon.id}`}> {/* Update the Link */}
            <div className="movie-card">
                <div className="movie-poster">
                    <img
                        src={sprite}
                        alt={formattedName}
                        loading="lazy"
                    />
                </div>
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ''}`} onClick={onFavoriteClick}>♡</button>
                </div>
                <div className="movie-info">
                    <h3>{formattedName}</h3>
                    <p>{types}</p>
                </div>
            </div>
        </Link>
    );
}

export default PokeCard;