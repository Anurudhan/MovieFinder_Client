import type MovieEntity from "./MovieEntity";


export default interface MovieCardProps {
    movie: MovieEntity;
    isFavorite: boolean;
    onFavoriteToggle: (movieId: string, event: React.MouseEvent) => void;
    onClick: () => void;
  }