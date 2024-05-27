'use client';

import { Movie, useMovieContext } from "@/context/movies";
import { Metadata } from "next";
import { useEffect, useState } from "react";


export default function MovieDetail({ params }: { params: { slug: string } }) {
    const { getMovieByImdbId, state: { loading, error } } = useMovieContext();
    const [movie, setMovie] = useState<Movie | null | undefined>(null); // Correct use of useState

    useEffect(() => {
        const foundMovie = getMovieByImdbId('/title/' + params.slug);
        setMovie(foundMovie);
    }, [params.slug]); 

    const backgroundImageStyle = {
        backgroundImage: `url(${movie?.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    if (!movie) {
        return <div>Movie not found {'/title/' + params.slug}</div>;
    }

    return (
        <main className="bg-zinc-900 min-h-screen">
            <div className="movie-detail-header w-screen p-4" style={backgroundImageStyle}>
                <div className="veil"></div>
                <h2 className="movie-title">{movie.name}</h2>
            </div>
            <div className="z-10 w-full max-w-5xl font-mono text-sm">
                   <p>{movie.desc}</p>
                   <div>
                     <div>
                        <p><span>Actors</span> {movie.actors.join(', ')}</p>
                        <p><span>Genre</span> {movie.genre.join(', ')}</p>
                        <p><span>Year</span> {movie.year}</p>
                     </div>
                     <div>{movie.rating} / 10</div>
                   </div>
            </div>
        </main>
    )
}