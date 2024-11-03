import { useState, useEffect } from 'react';
import axios from 'axios';
import "../HomePage.css"


function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies(setMovies);
    }, []);

    return (

        <div className>
            <section className="trailer-section">
                <h2>Watch the latest trailer</h2>
                <div className="trailer-container">
                    <iframe src="https://platform.twitter.com/widgets/tweet_button.html"></iframe>
                    <div className="play-button">▶️</div>
                </div>
            </section>

            <section className="movie-cards-section">
                    <h1>All movies:</h1>
                <div className="movie-cards-container">
                    {movies.map((movie) => (
                        <div div className="movie-card" key={movie.id}>
                            <img className="movie-img" src={movie.image}
                                 src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                 alt="movie logo"
                            />
                            <h2 className="title-movie-card">{movie.original_title}</h2>
                            <button className="add-to-list-button" onClick={() => handleAddToList(movie)}>
                                Add to list
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
                `https://api.themoviedb.org/3/movie/popular?api_key=${
                import.meta.env.VITE_MOVIEDB_APIKEY
            }&language=en-US&page=1`
                );
                const limitedMovies = response.data.results.slice(0, 8);
                setMovies(limitedMovies);
                console.log(response.data.results);
            } catch (error) {
                console.log(error);
            }
            }

                export default HomePage;
