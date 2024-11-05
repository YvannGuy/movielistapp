import React, { useState } from 'react';
import '../AddEditMovieForm.css';
import headerImage from '/src/assets/filmbg.jpg'; // Remplacez par le chemin de votre image

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
        setMovieData({ ...movieData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Code pour soumettre les données du formulaire
        console.log('Movie Data:', movieData);
    };

    return (
        <div className="main-container">
            {/* Container du formulaire */}
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

            {/* Image header */}
            <img src={headerImage} alt="Header" className="header-image" />
        </div>
    );
};

export default AddEditMovieForm;
