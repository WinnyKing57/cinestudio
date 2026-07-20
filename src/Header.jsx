import { Link, useNavigate } from "react-router";
import { useState } from "react";

export default function Header() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/movies/search?q=${encodeURIComponent(query.trim())}`);
        }
    }

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="header-logo">
                    <Link to="/">CIné<span>Studio</span></Link>
                </div>

                <input type="checkbox" id="header-toggle" className="header-toggle" />

                <label htmlFor="header-toggle" className="header-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>

                <nav className="header-nav">
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="#">Films</Link></li>
                        <li><Link to="#">Festivals</Link></li>
                        <li><Link to="#">Contact</Link></li>
                    </ul>
                </nav>
            </div>
            <form role="search" onSubmit={handleSearch}>
                <label htmlFor="search-input">Recherche un film:</label>
                <input 
                    type="search" 
                    id="search-input" 
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Titre du film"
                    autoComplete="search"
                />
                <button type="submit">Rechercher</button>
            </form>
        </header>
        
    )
}