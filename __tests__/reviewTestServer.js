import express from 'express';

export default function initializeServer(mockedAPI) {
  const server = express();

  server.get('/reviews/:id', async (req, res) => {
    const reviews = await mockedAPI.getReviewsForMovie(req.params.id, req.query.page?? 1);
    res.status(200).json(reviews);
  });

  return server;
}