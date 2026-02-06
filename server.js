import express from 'express';
import richardsAPI from './movieAPI.js';
import { averageMovieGrade, cmsAdapter } from './movieAPI.js';

const server = express();

server.use(express.json());

server.get('/movies', async(req, res) => {
	const movies = await richardsAPI.getMovies();
	res.status(200).json(movies);
});

server.get('/movies/:id', async(req, res) => {
	const movie = await richardsAPI.getMovie(req.params.id);
	res.status(200).json(movie);
});

server.get('/movies/:id/average-rating', async (req, res) => {
  const avg = await averageMovieGrade(cmsAdapter, req.params.id);
  res.json({ average: avg });
});

server.get('/reviews/:id', async (req, res) => {
	const reviews = await richardsAPI.getReviewsForMovie(req.params.id);
	res.status(200).json(reviews);
});

// kommande visningar för en film
server.get('/screenings', async(req, res) => {
  const movieId = req.query.movieId;

  if (!movieId) {
    return res.status(400).json({ error: "Bad Request, for movieId" });
  }

  const screenings = await richardsAPI.getUpcomingScreeningsForMovie(movieId);
  res.status(200).json({ data: screenings });

});

server.post('/reviews', async (req, res) => {
	try {
		const review = await richardsAPI.createReview(req.body);
		res.status(201).json(review);
	} catch (error) {
		res.status(500).json({ error: 'Could not create review' });
	}
});

server.use(express.static('static'));

server.listen(5080);