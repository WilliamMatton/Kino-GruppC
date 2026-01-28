import express from 'express';
import richardsAPI from './movieAPI.js';

const server = express();

server.get('/movies', async(req, res) => {
	const movies = await richardsAPI.getMovies();
	res.send(movies);
});

server.get('/screenings', async(req, res) => {
	const screenings = await richardsAPI.getScreenings();
	res.send(screenings);
});

server.use('/static', express.static('./static'));

server.listen(5080);