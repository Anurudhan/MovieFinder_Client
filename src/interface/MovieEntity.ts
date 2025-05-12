    // export default interface MovieEntity {
    //     id: number;
    //     title: string;
    //     releaseDate: string;
    //     posterUrl: string;
    //     description: string;
    //     genre: string[];
    //     rating: number;
    //     director: string;
    //   }


    export interface Rating {
        Source: string;
        Value: string;
    }
    
    export default interface MovieEntity {
        id: string; // imdbID
        title: string; // Title
        year: string; // Year
        rated: string; // Rated
        releaseDate: string; // Released
        runtime: string; // Runtime
        genre: string[]; // Genre (split from comma-separated string)
        director: string; // Director
        writer: string; // Writer
        actors: string; // Actors
        description: string; // Plot
        language: string; // Language
        country: string; // Country
        awards: string; // Awards
        posterUrl: string; // Poster
        ratings: Rating[]; // Ratings
        metascore: string; // Metascore
        imdbRating: string; // imdbRating
        imdbVotes: string; // imdbVotes
        type: string; // Type
        dvd: string; // DVD
        boxOffice: string; // BoxOffice
        production: string; // Production
        website: string; // Website
        response: string; // Response
        isFavorite?:boolean;
    }