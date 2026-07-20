import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Films() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        axios.get(`${API_URL}/movies`, { signal: controller.signal })
            .then(response => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch(err => {
                if (err.name !== "CanceledError") console.log(err);
                setLoading(false);
            });
        return () => controller.abort();
    }, []);

    if (loading) {
        return (
            <main>
                <div className="movies-container">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div className="skeleton-card" key={i}>
                            <div className="skeleton-img" />
                            <div className="skeleton-text" />
                        </div>
                    ))}
                </div>
            </main>
        );
    }

    return (
        <main>
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