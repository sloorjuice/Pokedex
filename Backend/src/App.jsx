import './css/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home.jsx';
import { Routes, Route} from 'react-router-dom';
import Favorites from './pages/Favorites';
import PokemonDetail from './pages/PokeDetail.jsx';
import { PokeProvider } from './context/PokeContext';
 
function App() {
  return(
    <PokeProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/favorites' element={<Favorites/>}></Route>
        <Route path='pokemon' element={<PokemonDetail />}>
          <Route path=':pokemonID' element={<PokemonDetail/>}></Route>
        </Route>
      </Routes>
    </PokeProvider>
 
  )
}
 
 
 
export default App