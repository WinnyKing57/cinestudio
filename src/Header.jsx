export default function Header() {
    return (
        <header className="site-header">
            <div className="header-container">
                <div className="header-logo">
                    <a href="/">CIné<span>Studio</span></a>
                </div>

                <input type="checkbox" id="header-toggle" className="header-toggle" />

                <label htmlFor="header-toggle" className="header-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>

                <nav className="header-nav">
                    <ul>
                        <li><a href="/" className="active">Accueil</a></li>
                        <li><a href="#">Films</a></li>
                        <li><a href="#">Festivals</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </div>
            <form role="search" method="get" action="/movies/search">
                <label htmlFor="search-input">Recherche un film:</label>
                <input 
                    type="search" 
                    id="search-input" 
                    name="q" 
                    placeholder="Titre du film"
                    autoComplete="search"
                />
                <button type="submit">Rechercher</button>
            </form>
        </header>
        
    )
}