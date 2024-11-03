import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
    const { id } = useParams();
    return <h1>Details for Movie ID: {id}</h1>;
};

export default MovieDetailPage;