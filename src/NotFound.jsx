import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="erreur">
            <h1>404</h1>
            <h2>Page non trouvée</h2>
            <p>Désolé, cette page n'existe pas.</p>
            <Link className="btn" to="/">Retour à l'accueil</Link>
        </div>
    );
}
