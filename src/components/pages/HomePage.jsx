import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../HomePage.css";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState(''); // New state for trailer URL
    const navigate = useNavigate();

    useEffect(() => {
        getAllMovies(setMovies);
    }, []);

    useEffect(() => {
        if (movies.length > 0) {
            fetchTrailerUrl(movies[0].id); // Fetch trailer for the first movie in the list
        }
    }, [movies]);

    const fetchTrailerUrl = async (movieId) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_MOVIEDB_APIKEY}`
            );
            const trailer = response.data.results.find(
                (video) => video.type === 'Trailer' && video.site === 'YouTube'
            );
            if (trailer) {
                setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
            }
        } catch (error) {
            console.error("Error fetching trailer:", error);
        }
    };

    const handleCreateList = () => {
        navigate('/AddEditMovieForm');
    };

    const handleAddToList = (movie) => {
        console.log("Added to list:", movie);
    };

    return (
        <div>
            <section className="trailer-section">
                <h2 className="title-item">WATCH THE LATEST TRAILER</h2>
                <div className="trailer-container">
                    {trailerUrl ? (
                        <iframe
                            className="screen-size"
                            src={trailerUrl}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="video"
                        />
                    ) : (
                        <p>Trailer not available.</p>
                    )}
                </div>
            </section>

            <section className="movie-cards-section">
                <button className="add-movie-list-button-plus" onClick={handleCreateList}>
                    Add movie
                </button>
                <div className="movie-cards-container">
                    {movies.map((movie) => (
                        <div className="movie-card" key={movie.id}>
                            <img
                                className="movie-img"
                                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                alt={movie.original_title}
                            />
                            <h2 className="title-movie-card">{movie.original_title}</h2>
                            <button className="add-to-list-button" onClick={() => handleAddToList(movie)}>
                                More details
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

async function getAllMovies(setMovies) {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_MOVIEDB_APIKEY}&language=en-US&page=1`
        );
        const limitedMovies = response.data.results.slice(0, 8);
        setMovies(limitedMovies);
        console.log(response.data.results);
    } catch (error) {
        console.log(error);
    }
}

export default HomePage;
