import { useParams } from "react-router-dom";
import { loadPokemon } from "../services/api";
import { useEffect, useState } from "react";
import "../css/PokeDetail.css"
 
 
function PokemonDetail() {
    let params = useParams();
    const pokeId = params.pokeID;
 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState(null)
 
   
    useEffect(() => {
    const loadCurrentPokemon = async () => {
        try {
            const pokeId = params.pokeID;
            const myPokemon = await loadPokemon(pokeId);
            setPokemon(myPokemon);
        } catch (err) {
            console.log(err);
            setError("Failed to load movies...");
        } finally {
            setLoading(false);
        }
        console.log(pokemon)
    };
   
    loadCurrentPokemon();
    }, [params]);
 
    return (
        <>
         {loading ? (
            <h1>Loading</h1>
         ) : (
            <div className="banner-container">
                <img
                    src={`https://pokeapi.co/api/v2/pokemon/${pokemon.sprites.other.showdown.front_default}`}
                    alt=""
                    className="banner"
                />
                <div className="content">
                    <h1>{pokemon.name}</h1>
               </div>
            </div>
         )}
        </>
    );
}
 
export default PokemonDetail;