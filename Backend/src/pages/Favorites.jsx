import "../css/Favorites.css"
import { usePokeContext } from "../context/PokeContext"
import PokeCard from "../components/PokeCard.jsx";
 
function Favorites() {
    const { favorites } = usePokeContext();
 
    if (favorites.length >0) {
        return(
            <div className="favorites">
                <h2>Your Favorites</h2>
                <div className="movie-grid">
                    {favorites.map(
                        (pokemon) => (<PokeCard pokemon={pokemon} id={pokemon.id}/>)
                    )}
                </div>
            </div>
        )
    }
 
    return (
        <div className="favorites-empty">
            <h2>No Favorite pokemon Yet</h2>
            <p>Start Adding pokemon and they will appear here</p>
        </div>
    )
}
 
export default Favorites