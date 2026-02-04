import express from 'express';
import richardsAPI from './movieAPI.js';

const server = express();

server.get('/movies', async(req, res) => {
	const movies = await richardsAPI.getMovies();
	res.status(200).json(movies);
});

server.get('/movies/:id', async(req, res) => {
	const movie = await richardsAPI.getMovie(req.params.id);
	res.status(200).json(movie);
});

server.get('/reviews/:id', async (req, res) => {
	const reviews = await richardsAPI.getReviewsForMovie(req.params.id, req.query.page?? 1);
	res.status(200).json(reviews);
});

server.use(express.static('static'));

server.listen(5080);