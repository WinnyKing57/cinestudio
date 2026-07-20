import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function DetailFilms() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        Promise.resolve().then(() => setLoading(true));
        axios.get(`${API_URL}/movies/${id}`, { signal: controller.signal })
            .then(response => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch(err => {
                if (err.name !== "CanceledError") {
                    setError(true);
                    setLoading(false);
                }
            });
        return () => controller.abort();
    }, [id]);

    if (loading) {
        return (
            <div className="skeleton-detail">
                <div className="skeleton-img" />
                <div className="skeleton-text" />
                <div className="skeleton-text" />
                <div className="skeleton-text short" />
            </div>
        );
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
                <img src={movie.poster_url} alt={movie.title} loading="lazy" />
                <div className="detail-container">
                    <p>{movie.overview}</p>
                    <img className="backdrop_url" src={movie.backdrop_url} alt="" loading="lazy" />
                    <h4>Sortie le : {movie.release_date}</h4>
                </div>
            </div>
            <Link className="btn" to="/">Retour à l'accueil</Link>
        </div>
    );
}