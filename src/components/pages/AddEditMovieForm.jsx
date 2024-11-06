import React, { useState } from 'react';
import axios from 'axios';
import '../AddEditMovieForm.css';
import headerImage from '/src/assets/filmbg.jpg';
import { API_URL } from '/src/api.js';

const AddEditMovieForm = () => {
    const [movieData, setMovieData] = useState({
        name: '',
        image: null,
        year: '',
        actors: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMovieData({ ...movieData, image: reader.result }); // Enregistre l'image en base64
            };
            reader.readAsDataURL(file); // Lit le fichier en tant que URL de données
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMovie = {
            title: movieData.name,
            imageURL: movieData.image, // Utilise l'image en base64
            year: movieData.year,
            actors: movieData.actors,
            description: movieData.description,
            createdByForm: true
        };

        try {
            const response = await axios.post(`${API_URL}/moviesapplist.json`, newMovie);
            console.log('Movie added successfully:', response.data);

            setMovieData({
                name: '',
                image: null,
                year: '',
                actors: '',
                description: ''
            });
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <div className="main-container">
            <div className="form-container">
                <h2>CREATE YOUR MOVIE</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Movie Name</label>
                        <input
                            type="text"
                            name="name"
                            value={movieData.name}
                            onChange={handleInputChange}
                            placeholder="Enter movie name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Upload Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>

                    <div className="form-group">
                        <label>Release Year</label>
                        <input
                            type="number"
                            name="year"
                            value={movieData.year}
                            onChange={handleInputChange}
                            placeholder="Enter release year"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Actors</label>
                        <input
                            type="text"
                            name="actors"
                            value={movieData.actors}
                            onChange={handleInputChange}
                            placeholder="Enter actors' names, separated by commas"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={movieData.description}
                            onChange={handleInputChange}
                            placeholder="Enter a brief description of the movie"
                            required
                        />
                    </div>

                    <button className="add-movie-button-second" type="submit">Add Movie</button>
                </form>
            </div>

            <img src={headerImage} alt="Header" className="header-image" />
        </div>
    );
};

export default AddEditMovieForm;
