import express from 'express';
import richardsAPI from './movieAPI.js';

const server = express();

server.get('/movies', async(req, res) => {
	const movies = await richardsAPI.getMovies();
	res.send(movies);
});

server.use('/static', express.static('./static'));

server.listen(5080);