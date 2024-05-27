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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    if (!movie) {
        return <div>Movie not found {'/title/' + params.slug}</div>;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <div>Dynamic page, slug: {params.slug}</div>   
            </div>
        </main>
    )
}