import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router";

export default function Films() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/movies")
            .then(response => {
                setMovies(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <main>
            <div className="movies-container">
                {movies.map(element => (
                    <div className="movie-container" key={element.id}>
                        <Link to={`/movies/${element.id}`}>
                            {element.title}
                            <img src={element.poster_url} alt={element.title} />
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}