import { useState } from 'react';
import { Movie } from '@/context/movies';
import './movie_card_sm.modules.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MovieCardSmProps {
    movie: Movie;
}

const MovieCardSm: React.FC<MovieCardSmProps> = ({ movie }) => {
    const [imageError, setImageError] = useState(false);
    const router = useRouter();

    return (
        <div className="movie-card-sm" onClick={() => router.push('/movies' + movie.imdb_url)}>
            <Image 
                src={imageError ? '/placeholder.png' : movie.image_url} 
                alt="movie image" 
                height={400} 
                width={150} 
                onError={() => setImageError(true)}
                className='image-movie-all'
            />
            <Image 
                className="movie_arrow-sm" 
                src="/circle-arrow-right-solid.svg" 
                alt="icon" 
                width={40} 
                height={40} 
            />
        </div>
    );
};

export default MovieCardSm;
