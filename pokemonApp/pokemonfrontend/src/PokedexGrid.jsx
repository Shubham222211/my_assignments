import { useState, useEffect } from "react"
import PokemonCard from "./PokemonCard"
import './input.css'

function PokedexGrid() {
  const [pokemonData, setPokemonData] = useState([])
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const itemsPerPage = 3
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mern-pokemon-app-1.onrender.com/pokemon/getdata")
        if (!response.ok) {
          
          console.log(error)
        }
        const data = await response.json()

        setPokemonData(data)
        
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  
  const filteredPokemon = pokemonData.filter((pokemon) =>

    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    if (sortKey === "id") return a.id - b.id;
    if (sortKey === "name") return a.name.localeCompare(b.name);
    if (sortKey === "type") return a.types[0].localeCompare(b.types[0])
    return 0
  })

  


  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPokemon = sortedPokemon.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedPokemon.length / itemsPerPage)

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>

      direction === "next" ? Math.min(prev + 1, totalPages) : Math.max(prev - 1, 1)
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokemon Explorer</h1>

      {loading ? (
        <p className="text-center text-lg">Loading Pokémon data...</p>
      ) : error ? (

        <p className="text-center text-lg text-red-500">{error}</p>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <input
              type="text"
              placeholder="Search Pokemon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 p-2 border rounded shadow"
            />

            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="p-2 border rounded shadow"
            >
              <option value="">Sort By</option>
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="type">Type</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                className="border rounded-lg shadow-lg p-4 bg-white"
              >
                <PokemonCard
                  id={pokemon.id}
                  name={pokemon.name}
                  types={pokemon.types}
                  sprite={pokemon.sprite}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default PokedexGrid
