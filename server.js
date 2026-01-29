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

/* server.use('/static', express.static('./static')); */
server.use(express.static('static'));

server.listen(5080);