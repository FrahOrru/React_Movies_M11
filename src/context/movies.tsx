'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface Movie {
    actors: string[];
    desc: string;
    directors: string[];
    genre: string[];
    image_url: string;
    thumb_url: string;
    imdb_url: string;
    name: string;
    rating: string;
    year: number;
}

interface MovieContextState {
    movies: Movie[];
    topRatedMovies: Movie[];
    loading: boolean;
    error: string | null;
}

interface MovieContextValue {
    state: MovieContextState;
    fetchMovies: () => void;
    fetchTopRatedMovies: () => void;
    getMovieByImdbId: (imdbId: string) => Movie | undefined;
}

const MovieContext = createContext<MovieContextValue | undefined>(undefined);

interface MovieProviderProps {
    children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
    const [state, setState] = useState<MovieContextState>({
        movies: [],
        topRatedMovies: [],
        loading: false,
        error: null,
    });

    const fetchMovies = async () => {
        setState({ ...state, loading: true, error: null });
        try {
            const response = await fetch('https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json');
            const data = await response.json();
            setState({ ...state, movies: data, loading: false, error: null });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setState({ ...state, movies: [], loading: false, error: errorMessage });
        }
    };

    const fetchTopRatedMovies = async () => {
        setState({ ...state, loading: true, error: null });
        try {
            const response = await fetch('https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json');
            const data: Movie[] = await response.json();
            const sortedMovies = data.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
            const topRatedMovies = sortedMovies.slice(0, 5);
            setState({ ...state, topRatedMovies, loading: false, error: null });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setState({ ...state, topRatedMovies: [], loading: false, error: errorMessage });
        }
    };

    const getMovieByImdbId = (imdbId: string): Movie | undefined => {
        return state.movies.find(movie => movie.imdb_url.includes(imdbId));
    };

    useEffect(() => {
        fetchMovies();
        fetchTopRatedMovies();
    }, []);

    return (
        <MovieContext.Provider value={{ state, fetchMovies, fetchTopRatedMovies, getMovieByImdbId }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (context === undefined) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
};
