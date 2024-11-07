import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '/src/api.js';
import "../HomePage.css";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [headerImage, setHeaderImage] = useState('');
    const [editMovieData, setEditMovieData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllMovies();
    }, []);

    // Fetch all movies from API
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
                selectRandomImage(moviesArray);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    // Function to set a random image as header background
    const selectRandomImage = (moviesArray) => {
        if (moviesArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * moviesArray.length);
            setHeaderImage(moviesArray[randomIndex].imageURL);
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
        setEditMovieData(movie);
    };

    const updateMovie = async () => {
        try {
            await axios.patch(`${API_URL}/moviesapplist/${editMovieData.id}.json`, editMovieData);
            setMovies(movies.map(movie => (movie.id === editMovieData.id ? editMovieData : movie)));
            setEditMovieData(null);
        } catch (error) {
            console.error("Error updating movie:", error);
        }
    };

    return (
        <div className="home-container">
            {/* Header section with background image */}
            <header
                className="body-container"
                style={{
                    backgroundImage: `url(${headerImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    padding: '13rem'
                }}
            >
                <h1 className="title"><span className="highlight">WTW</span> APP</h1>
                <h2 className="subtitle">
                    Discover. explore. and add.
                </h2>
            </header>

            {/* Rest of your component remains the same */}
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

            {editMovieData && (
                <div className="edit-form-modal-overlay">
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
                </div>
            )}
        </div>
    );
}

export default HomePage;
