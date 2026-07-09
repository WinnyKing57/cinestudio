import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router"; 
import axios from "axios";

export default function SearchFilms() {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("q"); 

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!name) return; 

        setLoading(true);
        setError(false);
        
        axios.get(`http://localhost:3000/movies/search?q=${name}`)
            .then(response => {
                setMovies(response.data);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [name]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error || movies.length === 0 || !movies[0]) {
        return (
            <div className="erreur">
                <h1>Erreur</h1>
                <h2>Aucun film trouvé pour "{name}"</h2>
                <Link className="btn" to="/">Retour</Link>
            </div>
        );
    }

    const movie = movies[0]; 

    return (
        <div className="movie-container-details">
            <h1>{movie.title}</h1>
            <div className="detail-img-container">
                <img src={movie.poster_url} alt={movie.title} />
                <div className="detail-container">
                    <p>{movie.overview}</p>
                    <img className="backdrop_url" src={movie.backdrop_url} alt="" />
                    <h4>Sortie le : {movie.release_date}</h4>
                </div>
            </div>
            <Link className="btn" to="/">Retour à l'accueil</Link>
        </div>
    );
}