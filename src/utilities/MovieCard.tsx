import { Heart } from 'lucide-react';
import type MovieCardProps from '../interface/MovieCardProps';

const MovieCard = ({ movie, isFavorite, onFavoriteToggle, onClick }: MovieCardProps) => {
  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-gray-750 group"
      onClick={onClick}
      style={{
        backgroundImage: 'radial-gradient(circle at top right, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
      }}
    >
      <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
        <img
          src={movie.posterUrl !== 'N/A' ? movie.posterUrl : 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
        <button
          onClick={(e) => onFavoriteToggle(movie.id, e)}
          className="absolute top-3 right-3 p-2 rounded-full bg-black bg-opacity-60 backdrop-blur-sm transform transition-all duration-300 hover:scale-110"
        >
          <Heart
            size={16}
            className={`transition-all duration-300 ${isFavorite ? 'text-red-500 fill-red-500 scale-110' : 'text-white'}`}
          />
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-base font-semibold truncate group-hover:text-blue-400 transition-colors duration-300">
          {movie.title} ({movie.year})
        </h3>
        <p className="text-gray-400 text-xs">
          {movie.releaseDate} • {movie.rated}
        </p>
        <p className="text-gray-300 text-xs mt-1">
          IMDb: {movie.imdbRating}/10 ({movie.imdbVotes})
        </p>
        <div className="mt-2 flex gap-1 flex-wrap">
          {movie.genre.slice(0, 2).map((genre) => (
            <span key={genre} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">
              {genre}
            </span>
          ))}
          {movie.genre.length > 2 && (
            <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">
              +{movie.genre.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;