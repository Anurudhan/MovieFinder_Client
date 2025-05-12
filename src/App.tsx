import { useEffect, useState, useCallback } from 'react';
import './App.css';
import type MovieEntity from './interface/MovieEntity';
import { Search } from 'lucide-react';
import MovieCard from './utilities/MovieCard';
import Pagination from './utilities/Pagination';
import MovieModal from './utilities/MovieModal';
import { commonRequest } from './api/commonRequest';
import AxiosConfig from './api/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDebounce from './utilities/Debounce';

function App() {
  const [movies, setMovies] = useState<MovieEntity[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [selectedMovie, setSelectedMovie] = useState<MovieEntity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;
  const URL = import.meta.env.VITE_BACK_END_URL;

  // Debounce the search query with a 500ms delay
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch all movies from backend
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const searchTerm = debouncedSearchQuery || '';
      const response = await commonRequest<{ movies: MovieEntity[]; totalResults: number }>(
        'GET',
        `${URL}/movies?searchTerm=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`,
        undefined,
        AxiosConfig
      );
      const { movies, totalResults } = response.data;
      setMovies(movies);
      setTotalMovies(totalResults);
      setFavorites(movies.filter((movie: MovieEntity) => movie.isFavorite).map((movie: MovieEntity) => movie.id));
    } catch (err) {
      console.error(err);
      setError('Failed to fetch movies. Please try again.');
      toast.error('Failed to fetch movies!', {
        position: 'top-center',
        theme: 'dark',
      });
      setTimeout(() => {
        toast.dismiss();
      }, 3500);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery, currentPage, URL]);

  // Fetch favorite movies from backend
  const fetchFavorites = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await commonRequest<{ movies: MovieEntity[]; totalResults: number }>(
        'GET',
        `${URL}/movies/favorites?page=${currentPage}&limit=${itemsPerPage}`,
        undefined,
        AxiosConfig
      );
      const { movies, totalResults } = response.data;
      setMovies(movies);
      setTotalMovies(totalResults);
      setFavorites(movies.map((movie: MovieEntity) => movie.id));
    } catch (err) {
      console.error(err);
      setError('Failed to fetch favorites. Please try again.');
      toast.error('Failed to fetch favorites!', {
        position: 'top-center',
        theme: 'dark',
      });
      setTimeout(() => {
        toast.dismiss();
      }, 3500);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, URL]);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'favorites') {
      fetchFavorites();
    } else {
      fetchMovies();
    }
  }, [activeTab, fetchMovies, fetchFavorites]);

  // Toggle favorite status
  const toggleFavorite = async (movieId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const movie = movies.find((m) => m.id === movieId);
    try {
      if (favorites.includes(movieId)) {
        await commonRequest('DELETE', `${URL}/movies/favorites`, { movieId }, AxiosConfig);
        setFavorites((prev) => prev.filter((id) => id !== movieId));
        if (activeTab === 'favorites') {
          setMovies((prev) => prev.filter((m) => m.id !== movieId));
          setTotalMovies((prev) => prev - 1);
        }
        toast.success('Removed from favorites!', {
          position: 'top-center',
          theme: 'dark',
        });
        setTimeout(() => {
          toast.dismiss();
        }, 3500);
      } else if (movie) {
        await commonRequest('POST', `${URL}/movies/favorites`, { movie }, AxiosConfig);
        setFavorites((prev) => [...prev, movieId]);
        toast.success('Added to favorites!', {
          position: 'top-center',
          theme: 'dark',
        });
        setTimeout(() => {
          toast.dismiss();
        }, 3500);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to update favorites.');
      toast.error('Failed to update favorites!', {
        position: 'top-center',
        theme: 'dark',
      });
      setTimeout(() => {
        toast.dismiss();
      }, 3500);
    }
  };

  // Open movie details modal
  const openModal = (movie: MovieEntity) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close movie details modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Banner movies (first 3 movies)
  const bannerMovies = movies.slice(0, 3);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, activeTab]);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get current page movies (backend handles pagination)
  const currentMovies = movies;

  return (
    <div
      className="min-h-screen bg-black text-gray-100"
      style={{
        backgroundImage:
          'radial-gradient(circle at 25% 25%, rgba(20, 20, 50, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(30, 80, 100, 0.15) 0%, transparent 50%)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Header with Search and Filters */}
      <header className="sticky top-0 z-40 bg-black bg-opacity-50 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-blue-400">MovieFinder</h1>
            <div className="flex flex-1 sm:flex-initial sm:ml-6 justify-center gap-3">
              <div className="flex bg-gray-900/60 rounded-lg p-0.5 border border-gray-700/50">
                <button
                  className={`px-4 py-1 rounded-md text-sm transition-all duration-300 ${
                    activeTab === 'all' ? 'bg-blue-600/80 text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button
                  className={`px-4 py-1 rounded-md text-sm transition-all duration-300 ${
                    activeTab === 'favorites' ? 'bg-blue-600/80 text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('favorites')}
                >
                  Favorites
                </button>
              </div>
            </div>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/60 text-white placeholder-gray-400 border border-gray-700/50 rounded-lg py-1 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Loading movies...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-12">
          <p className="text-xl text-red-400">{error}</p>
          <button
            onClick={activeTab === 'favorites' ? fetchFavorites : fetchMovies}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Banner Section */}
      {!isLoading && !error && (
        <div className="relative w-full h-40 md:h-64 overflow-hidden">
          <div className="absolute inset-0 flex">
            {bannerMovies.map((movie) => (
              <div key={movie.id} className="w-1/3 h-full relative">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{ backgroundImage: `url(${movie.posterUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center px-4 drop-shadow-lg">
              Discover Movies
            </h1>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !error && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Movie Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                onFavoriteToggle={toggleFavorite}
                onClick={() => openModal(movie)}
              />
            ))}
          </div>

          {/* Empty state */}
          {currentMovies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">
                {activeTab === 'favorites' && favorites.length === 0
                  ? "You haven't added any favorites yet"
                  : 'No movies found matching your search'}
              </p>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            totalItems={totalMovies}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Movie Detail Modal */}
      <MovieModal
        movie={selectedMovie as MovieEntity}
        isOpen={isModalOpen}
        onClose={closeModal}
        isFavorite={selectedMovie ? favorites.includes(selectedMovie.id) : false}
        onFavoriteToggle={toggleFavorite}
      />

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;