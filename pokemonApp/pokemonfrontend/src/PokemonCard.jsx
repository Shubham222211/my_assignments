import { Link } from "react-router-dom";

function PokemonCard({ id, name, types, sprite }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transform hover:scale-105 transition-transform duration-300">

      <img src={sprite} alt={name} className="w-24 h-24 mx-auto mb-4" />

      <h3 className="text-xl font-semibold">{name}</h3>
      
      {/* <p className="text-gray-500">ID: {id}</p> */}
      <p className="text-gray-500">Type: {types.join(", ")}</p>
      <Link to={`/pokemon/${id}`} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
}

export default PokemonCard;
