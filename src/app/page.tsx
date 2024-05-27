'use client';

import MovieCardLg from "@/components/MovieCardLg/movie_card_lg";
import { useMovieContext } from "@/context/movies";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { state, fetchTopRatedMovies } = useMovieContext();
  const { topRatedMovies, loading, error } = state;

  useEffect(() => {
      fetchTopRatedMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full items-center justify-between font-mono text-sm lg:flex">
      <ul>
        {topRatedMovies?.map((movie, index) => (
          <MovieCardLg movie={movie} key={index}>
          </MovieCardLg>
        ))}
      </ul>
      </div>
    </main>
  );
}
