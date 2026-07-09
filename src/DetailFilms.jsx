import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";

export default function DetailFilms() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios.get(`http://localhost:3000/movies/${id}`)
            .then(response => {
                setMovie(response.data);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error || !movie) {
        return (
            <div className="erreur">
                <h1>Erreur</h1>
                <h2>Film non trouvé</h2>
                <Link className="btn" to="/">Retour</Link>
            </div>
        );
    }

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