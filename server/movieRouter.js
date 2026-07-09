import { Router } from "express";
import movies from "./movies.json" with { type: "json" };

const router = Router();

router.get("/", async (req, res) => {
  const lightMovies = movies.map(({ id, title, poster_url }) => ({
    id,
    title,
    poster_url,
  }));

  res.json(lightMovies);
});

router.get("/search", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  const results = movies.filter((movie) =>
    movie.title.toLowerCase().includes(q.toLowerCase())
  );

  if (results.length === 0) {
    return res.status(404).json({ error: "No movie found" });
  }

  return res.json(results);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const movie = movies.find((movie) => movie.id === parseInt(id, 10));

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  return res.json(movie);
});

export default router;