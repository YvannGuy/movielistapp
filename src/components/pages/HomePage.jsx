import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '/src/api.js';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import 'videojs-youtube';
import "../HomePage.css";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [editMovieData, setEditMovieData] = useState(null); // State to store data of the movie being edited
    const navigate = useNavigate();

    useEffect(() => {
        getAllMovies();
    }, []);

    useEffect(() => {
        if (movies.length > 2) {
            const FifthMovie = movies[2];
            if (FifthMovie.trailerUrl) {
                setTrailerUrl(FifthMovie.trailerUrl);
            }
        }
    }, [movies]);

    const getAllMovies = async () => {
        try {
            const response = await axios.get(`${API_URL}/moviesapplist.json`);
            const moviesObject = response.data;
            if (moviesObject) {
                const moviesArray = Object.keys(moviesObject).map((key) => ({
                    id: key,
                    ...moviesObject[key],
                }));
                setMovies(moviesArray);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handleCreateList = () => {
        navigate('/AddEditMovieForm');
    };

    const handleAddToList = (movie) => {
        navigate(`/details/${movie.id}`);
    };

    const handleDeleteMovie = async (movieId) => {
        try {
            await axios.delete(`${API_URL}/moviesapplist/${movieId}.json`);
            setMovies(movies.filter(movie => movie.id !== movieId));
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    const editMovie = (movie) => {
        setEditMovieData(movie); // Open the edit form with the selected movie's data
    };

    const updateMovie = async () => {
        try {
            await axios.patch(`${API_URL}/moviesapplist/${editMovieData.id}.json`, editMovieData);
            setMovies(movies.map(movie => (movie.id === editMovieData.id ? editMovieData : movie)));
            setEditMovieData(null); // Close the edit form after submission
        } catch (error) {
            console.error("Error updating movie:", error);
        }
    };

    useEffect(() => {
        if (trailerUrl) {
            const player = videojs('my-video', {
                controls: true,
                autoplay: false,
                preload: 'auto',
                poster: false,
                sources: [{
                    src: trailerUrl,
                    type: 'video/youtube',
                }],
                youtube: {
                    modestbranding: 1,
                    rel: 0,
                },
            });

            player.posterImage.hide();
            return () => {
                player.dispose();
            };
        }
    }, [trailerUrl]);

    return (
        <div className="home-container">
            <header className="body-container">
                <h1 className="title"><span className="highlight">WTW</span> APP</h1>
                <p className="subtitle">
                    Discover, explore, and add the best movies to your watchlist! Dive into our
                    collection to find the latest hits, timeless classics, and personalized
                    recommendations. Your next movie night starts here!
                </p>
            </header>

            <section className="trailer-section">
                <h2 className="title-item">WATCH THE LATEST TRAILER</h2>
                <div className="trailer-container">
                    {trailerUrl ? (
                        <div data-vjs-player>
                            <video
                                id="my-video"
                                className="video-js vjs-default-skin"
                                controls
                            >
                            </video>
                        </div>
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
                            <img className="movie-img" src={movie.imageURL} alt={movie.title} />
                            <h2 className="title-movie-card">{movie.title}</h2>
                            <button className="add-to-list-button" onClick={() => handleAddToList(movie)}>
                                <p>Infos</p>
                            </button>
                            <button className="delete-movie-button" onClick={() => handleDeleteMovie(movie.id)}>
                                Delete
                            </button>
                            <button className="edit-movie-button" onClick={() => editMovie(movie)}>
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Edit Form Modal */}
            {editMovieData && (
                <div className="edit-form-modal">
                    <h3>Edit Movie</h3>
                    <input
                        type="text"
                        value={editMovieData.title}
                        onChange={(e) => setEditMovieData({ ...editMovieData, title: e.target.value })}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={editMovieData.imageURL}
                        onChange={(e) => setEditMovieData({ ...editMovieData, imageURL: e.target.value })}
                        placeholder="Image URL"
                    />
                    <input
                        type="text"
                        value={editMovieData.trailerUrl}
                        onChange={(e) => setEditMovieData({ ...editMovieData, trailerUrl: e.target.value })}
                        placeholder="Trailer URL"
                    />
                    <button onClick={updateMovie}>Submit</button>
                    <button onClick={() => setEditMovieData(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default HomePage;
