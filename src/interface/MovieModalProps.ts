import type MovieEntity from "./MovieEntity";


export default interface MovieModalProps {
    movie: MovieEntity;
    isOpen: boolean;
    onClose: () => void;
    isFavorite: boolean;
    onFavoriteToggle: (id: string, e: React.MouseEvent) => void;
  }