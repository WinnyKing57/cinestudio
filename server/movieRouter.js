import { Router } from "express";
import movies from "./movies.json" with { type: "json" };

const router = Router();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p/original";

function useTmdb() {
  return !!TMDB_API_KEY;
}

function mapTmdbMovie(m) {
  return {
    id: m.id,
    title: m.title,
    overview: m.overview || "",
    poster_url: m.poster_path ? `${TMDB_IMG}${m.poster_path}` : null,
    backdrop_url: m.backdrop_path ? `${TMDB_IMG}${m.backdrop_path}` : null,
    release_date: m.release_date || "",
    vote_average: m.vote_average || 0,
    genre_ids: m.genre_ids || [],
  };
}

// GET /movies — liste des films (populaires depuis TMDB, ou JSON local)
router.get("/", async (req, res) => {
  if (useTmdb()) {
    try {
      const page = req.query.page || 1;
      const resp = await fetch(
        `${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}`
      );
      const data = await resp.json();
      const lightMovies = (data.results || []).map((m) => ({
        id: m.id,
        title: m.title,
        poster_url: m.poster_path ? `${TMDB_IMG}${m.poster_path}` : null,
      }));
      return res.json(lightMovies);
    } catch (err) {
      console.error("TMDB error:", err.message);
      // fallback vers JSON
    }
  }

  const lightMovies = movies.map(({ id, title, poster_url }) => ({
    id,
    title,
    poster_url,
  }));
  res.json(lightMovies);
});

// GET /movies/trending — films tendance TMDB
router.get("/trending", async (req, res) => {
  if (!useTmdb()) {
    return res.status(503).json({ error: "TMDB_API_KEY non configurée" });
  }
  try {
    const resp = await fetch(
      `${TMDB_BASE}/trending/movie/week?api_key=${TMDB_API_KEY}&language=fr-FR`
    );
    const data = await resp.json();
    const movies = (data.results || []).map(mapTmdbMovie);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /movies/search?q= — recherche TMDB ou JSON local
router.get("/search", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  if (useTmdb()) {
    try {
      const resp = await fetch(
        `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&language=fr-FR&query=${encodeURIComponent(q)}`
      );
      const data = await resp.json();
      const results = (data.results || []).map(mapTmdbMovie);
      if (results.length === 0) {
        return res.status(404).json({ error: "No movie found" });
      }
      return res.json(results);
    } catch (err) {
      console.error("TMDB search error:", err.message);
      // fallback vers JSON
    }
  }

  const results = movies.filter((movie) =>
    movie.title.toLowerCase().includes(q.toLowerCase())
  );

  if (results.length === 0) {
    return res.status(404).json({ error: "No movie found" });
  }

  return res.json(results);
});

// GET /movies/:id — détail d'un film (TMDB ou JSON local)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (useTmdb()) {
    try {
      const resp = await fetch(
        `${TMDB_BASE}/movie/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`
      );
      if (!resp.ok) {
        return res.status(404).json({ error: "Movie not found" });
      }
      const data = await resp.json();
      return res.json(mapTmdbMovie(data));
    } catch (err) {
      console.error("TMDB detail error:", err.message);
      // fallback vers JSON
    }
  }

  const movie = movies.find((m) => m.id === parseInt(id, 10));
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  return res.json(movie);
});

export default router;