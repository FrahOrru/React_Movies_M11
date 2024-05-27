"use client";

import { Movie, useMovieContext } from "@/context/movies";
import { useEffect, useState } from "react";

export default function MoviesGrid(){
    const { fetchMovies, state: { movies, loading, error } } = useMovieContext();
    const [movie, setMovie] = useState<Movie | null | undefined>(null); // Correct use of useState

    useEffect(() => {
        fetchMovies();
    }, []); 

    return (<div>
        {movies.map((movie) => {
            return <div key={movie.imdb_url}>{movie.name}</div>
        })}
    </div>)
}