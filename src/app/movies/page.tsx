'use client';

import MovieCardSm from "@/components/MovieCardSm/movie_card_sm";
import Search from "@/components/SearchInput/search_input";
import { Movie, useMovieContext } from "@/context/movies";
import { useEffect, useState } from "react";

export default function MoviesGrid() {
    const { fetchMovies, getAllMoviesSortedByRating, state: { loading, error } } = useMovieContext();
    const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    
    useEffect(() => {
        fetchMovies();
        const movies = getAllMoviesSortedByRating();
        setSortedMovies(movies);
        setFilteredMovies(movies);
    }, []); 

    useEffect(() => {
        if (!loading && !error) {
            const movies = getAllMoviesSortedByRating();
            setSortedMovies(movies);
            setFilteredMovies(movies);
        }
    }, [loading, error, getAllMoviesSortedByRating]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleSearch = (searchTerm: string) => {
        if (searchTerm === '') {
            setFilteredMovies(sortedMovies); // Reset to all movies if search is empty
        } else {
            const filtered = sortedMovies.filter(movie => 
                movie.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMovies(filtered);
        }
    };

    return (
        <div>
            <Search onSearch={handleSearch} />
            <div className="movie-list mt-4">
                {filteredMovies.map((movie) => (
                    <MovieCardSm key={movie.imdb_url} movie={movie} />
                ))}
            </div>
        </div>
    );
}
