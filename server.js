import express from 'express';
import richardsAPI from './movieAPI.js';

const server = express();

server.get('/movies', async(req, res) => {
	const movies = await richardsAPI.getMovies();
	res.send(movies);
});

server.get('/movies/:id', async(req, res) => {
	console.log(req.params.id);
	const movie = await richardsAPI.getMovie(req.params.id);
	res.send(movie);
});

server.use(express.static('static'));

server.listen(5080);