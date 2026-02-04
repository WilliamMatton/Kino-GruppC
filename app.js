import express from 'express';

export default function initializeApp(api) {
  const server = express();

  server.get('/movies', async(req, res) => {
    const movies = await api.getMovies();
    res.status(200).json(movies);
  });

  server.get('/movies/:id', async(req, res) => {
    const movie = await api.getMovie(req.params.id);
    res.status(200).json(movie);
  });

  server.get('/reviews/:id', async (req, res) => {
    const reviews = await api.getReviewsForMovie(req.params.id, req.query.page?? 1);
    res.status(200).json(reviews);
  });

  server.use(express.static('static'));

  return server;
}