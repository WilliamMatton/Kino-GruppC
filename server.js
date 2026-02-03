import express from 'express';
import richardsAPI from './movieAPI.js';
import { averageMovieGrade, cmsAdapter } from './movieAPI.js';

const server = express();

server.get('/movies', async(req, res) => {
	const movies = await richardsAPI.getMovies();
	res.status(200).json(movies);
});

server.get('/movies/:id', async(req, res) => {
	console.log(req.params.id);
	const movie = await richardsAPI.getMovie(req.params.id);
	res.status(200).json(movie);
});

server.get('/movies/:id/average-rating', async (req, res) => {
  const avg = await averageMovieGrade(cmsAdapter, req.params.id);
  res.json({ average: avg });
});

server.use(express.static('static'));

server.listen(5080);