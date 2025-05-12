import { Heart, X } from 'lucide-react';
import type MovieModalProps from '../interface/MovieModalProps';

const MovieModal = ({ movie, isOpen, onClose, isFavorite, onFavoriteToggle }: MovieModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden max-w-3xl w-full max-h-[80vh] shadow-2xl border border-gray-700"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px 0 rgba(66, 153, 225, 0.1)',
        }}
      >
        <div className="animate-modal-slide">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10 transform hover:scale-110"
          >
            <X size={18} className="text-gray-300" />
          </button>

          <div className="relative h-40 md:h-64 w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center blur-sm"
              style={{
                backgroundImage: `url(${
                  movie.posterUrl !== 'N/A' ? movie.posterUrl : 'https://via.placeholder.com/300x450?text=No+Poster'
                })`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-6 flex items-end">
              <div className="w-24 h-36 md:w-32 md:h-48 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={movie.posterUrl !== 'N/A' ? movie.posterUrl : 'https://via.placeholder.com/300x450?text=No+Poster'}
                  alt={`${movie.title} poster`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ml-4 flex-1">
                <h2 className="text-xl md:text-3xl font-bold text-white">
                  {movie.title} ({movie.year})
                </h2>
                <p className="text-gray-300 text-sm md:text-base">
                  {movie.releaseDate} • {movie.rated} • {movie.runtime}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-white text-sm">
                      {movie.imdbRating !== 'N/A' ? movie.imdbRating : 'N/A'}/10 (
                      {movie.imdbVotes !== 'N/A' ? movie.imdbVotes : 'N/A'})
                    </span>
                  </div>

                  <button
                    onClick={(e) => onFavoriteToggle(movie.id, e)}
                    className="ml-auto p-2 rounded-full bg-gray-800 bg-opacity-70 hover:bg-opacity-90 transition-all"
                  >
                    <Heart
                      size={16}
                      className={`${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[40vh]">
            <div className="flex gap-2 mb-4 flex-wrap">
              {movie.genre.map((genre) => (
                <span key={genre} className="bg-blue-900/50 px-3 py-1 rounded-full text-xs">
                  {genre}
                </span>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Overview</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{movie.description}</p>
            </div>

            <div className="pt-2 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-200">Director:</span> {movie.director}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-200">Writer:</span> {movie.writer}
                </p>
                <p className="text-sm text box-gray-400">
                  <span className="font-semibold text-gray-200">Actors:</span> {movie.actors}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-200">Language:</span> {movie.language}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-200">Country:</span> {movie.country}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-200">Box Office:</span>{' '}
                  {movie.boxOffice !== 'N/A' ? movie.boxOffice : 'N/A'}
                </p>
              </div>
            </div>

            {movie.awards !== 'N/A' && (
              <div className="mt-4 pt-2 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">Awards</h3>
                <p className="text-sm text-gray-400">{movie.awards}</p>
              </div>
            )}

            {movie.ratings.length > 0 && (
              <div className="mt-4 pt-2 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">Ratings</h3>
                <ul className="text-sm text-gray-400">
                  {movie.ratings.map((rating, index) => (
                    <li key={index}>
                      {rating.Source}: {rating.Value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {movie.website !== 'N/A' && (
              <div className="mt-4 pt-2 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">Website</h3>
                <a
                  href={movie.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline"
                >
                  {movie.website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;