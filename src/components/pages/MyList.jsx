import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '/src/api.js';
import '../MyList.css';

function MyList() {
    const [movies, setMovies] = useState([]);

    // Fonction pour récupérer les films
    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`${API_URL}/moviesapplist.json`);
            const moviesObject = response.data;

            if (moviesObject) {
                const moviesArray = Object.keys(moviesObject).map((key) => ({
                    id: key,
                    ...moviesObject[key],
                }));

                // Filtrer les films pour n'afficher que ceux créés via le formulaire
                const createdMovies = moviesArray.filter(movie => movie.createdByForm);
                setMovies(createdMovies);
            } else {
                setMovies([]); // Liste vide si aucun film n'est trouvé
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    // Fonction pour supprimer un film
    const handleDelete = async (movieId) => {
        try {
            await axios.delete(`${API_URL}/moviesapplist/${movieId}.json`);
            // Met à jour l'affichage en filtrant le film supprimé
            setMovies(movies.filter((movie) => movie.id !== movieId));
            console.log("Film supprimé avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression du film :", error);
        }
    };

    return (
        <div className="mylist-container">
            {movies.length === 0 ? (
                <p>No movies found. Add some movies to your list!</p>
            ) : (
                <div className="movie-cards-container">
                    {movies.map((movie) => (
                        <div className="movie-card" key={movie.id}>
                            <img className="movie-img" src={movie.imageURL} alt={movie.title} />
                            <h2 className="title-movie-card">{movie.title}</h2>
                            <p>{movie.year}</p>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(movie.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyList;
