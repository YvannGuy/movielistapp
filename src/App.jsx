// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage.jsx';
import Navbar from './components/Navbar.jsx'
import MyListPage from './components/pages/MyListPage.jsx';
import MovieDetailPage from './components/pages/MovieDetailPage';
import AddEditMovieForm from './components/pages/AddEditMovieForm';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/my-list" element={<MyListPage />} />
                <Route path="/details/:id" element={<MovieDetailPage />} />
                <Route path="/add" element={<AddEditMovieForm />} />
            </Routes>
        </Router>
    );

};

export default App;
