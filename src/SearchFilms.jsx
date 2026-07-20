import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router"; 
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function SearchFilms() {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("q"); 

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(!!name);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!name) return;

        const controller = new AbortController();
        Promise.resolve().then(() => setLoading(true));
        
        axios.get(`${API_URL}/movies/search?q=${encodeURIComponent(name)}`, { signal: controller.signal })
            .then(response => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch(err => {
                if (err.name !== "CanceledError") {
                    setError(true);
                    setLoading(false);
                }
            });
        return () => controller.abort();
    }, [name]);

    if (!name) {
        return (
            <div className="erreur">
                <h1>Recherche</h1>
                <h2>Veuillez saisir un titre de film</h2>
                <Link className="btn" to="/">Retour à l'accueil</Link>
            </div>
        );
    }

    if (loading) {
        return (
            <main>
                <h2>Résultats pour "{name}"</h2>
                <div className="movies-container">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div className="skeleton-card" key={i}>
                            <div className="skeleton-img" />
                            <div className="skeleton-text" />
                        </div>
                    ))}
                </div>
            </main>
        );
    }

    if (error || movies.length === 0) {
        return (
            <div className="erreur">
                <h1>Erreur</h1>
                <h2>Aucun film trouvé pour "{name}"</h2>
                <Link className="btn" to="/">Retour</Link>
            </div>
        );
    }

    return (
        <main>
            <h2>Résultats pour "{name}" ({movies.length} film{movies.length > 1 ? "s" : ""})</h2>
            <div className="movies-container">
                {movies.map(element => (
                    <div className="movie-container" key={element.id}>
                        <Link to={`/movies/${element.id}`}>
                            {element.title}
                            <img src={element.poster_url} alt={element.title} loading="lazy" />
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}