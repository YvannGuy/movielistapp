import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '/src/api.js';
import "../MovieDetailPage.css";

const MovieDetailPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/moviesapplist/${id}.json`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="movie-details-container">
            <div className="movie-image-container">
                <img src={movie.imageURL} alt={movie.title} className="movie-detail-image" />
            </div>
            <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-description">{movie.description}</p>
                <p className="movie-info-item"><span>Years:</span> {movie.years || "N/A"}</p>
                <p className="movie-info-item"><span>Casting:</span> {movie.casting || "N/A"}</p>
                <p className="movie-info-item">
                    <span>Watch Trailer:</span>{" "}
                    {movie.trailerUrl ? (
                        <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                                alt="YouTube Logo"
                                className="youtube-logo"
                            />
                        </a>
                    ) : (
                        "N/A"
                    )}
                </p>


            </div>
        </div>
    );
};

export default MovieDetailPage;
