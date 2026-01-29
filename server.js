import express from 'express';
import richardsAPI from './movieAPI.js';

const server = express();

server.get('/movies', async(req, res) => {
	const movies = await richardsAPI.getMovies();
	res.status(200).json(movies);
});

server.get('/screenings', async(req, res) => {
	const screenings = await richardsAPI.getScreenings();
	res.status(200).json(screenings);
});

server.get('/movies/:id', async(req, res) => {
	console.log(req.params.id);
	const movie = await richardsAPI.getMovie(req.params.id);
	res.status(200).json(movie);
});

server.use(express.static('static'));

server.listen(5080);