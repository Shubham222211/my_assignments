import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokedexGrid from "./PokedexGrid";
import './input.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<PokedexGrid />} />
          {/* <Route path="/pokemon/:id" element={<PokemonDetails />} /> */}
        </Routes>
      </div>
    </BrowserRouter>

    
  )
}

export default App;
