import './css/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import Favorites from './pages/Favorites';
import PokemonDetail from './pages/PokeDetail.jsx';
import { PokeProvider } from './context/PokeContext';
import All from "./pages/All.jsx";

function App() {
  return (
    <PokeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/all" element={<All />} />
        <Route path="/pokemon/:pokeID" element={<PokemonDetail />} /> {/* Fix this route */}
      </Routes>
    </PokeProvider>
  );
}

export default App;