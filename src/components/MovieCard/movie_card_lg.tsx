import { Movie } from "@/context/movies";
import './movie_card_lg.modules.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MovieCardLgProps {
    movie: Movie;
}
const MovieCardLg: React.FC<MovieCardLgProps> = ({ movie }) => {
    const router = useRouter();
    
    const backgroundImageStyle = {
        backgroundImage: `url(${movie.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="w-screen movie-card-lg" style={backgroundImageStyle}>
            <div className="veil"></div>
            <div className="movie-content px-12 py-12">
                <h2 className="movie-title">{movie.name}</h2>
                <p className="py-9 w-3/4">{movie.desc}</p>

                <div>
                    <p><span>Actors</span> {movie.actors.join(', ')}</p>
                    <p><span>Genre</span> {movie.genre.join(', ')}</p>
                    <p><span>Year</span> {movie.year}</p>
                </div>
            </div>
            <Image className="movie_image" onClick={() => router.push('/movies' + movie.imdb_url)} src="/circle-arrow-right-solid.svg" alt="icon" width={40} height={40}></Image>
        </div>
    );
};

export default MovieCardLg;