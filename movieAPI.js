const MOVIE_API = 'https://plankton-app-xhkom.ondigitalocean.app/api';
const REVIEWS_API = 'https://plankton-app-xhkom.ondigitalocean.app/api/reviews';
const SCREENINGS_API = 'https://plankton-app-xhkom.ondigitalocean.app/api/screenings';

async function getMovies() {
  const res = await fetch(MOVIE_API + '/movies');
  const text = await res.json();
  return text.data;
}

async function getMovie(id) {
  const res = await fetch(MOVIE_API + '/movies/' + id);
  const json = await res.json();
  return json.data;
}

async function getReviews() {
  const res = await fetch(REVIEWS_API + '/reviews');
  const text = await res.json();
  return text.data;
  
}

async function getReviewrating(rating){
  const res = await fetch(REVIEWS_API + '/reviews/' + rating);
  const json = await res.json();
  return json.data;
}

async function getUpcomingScreeningsForMovie(movieId) {
  const now = new Date().toISOString();

  const url =
    MOVIE_API +
    `/screenings?filters[movie]=${movieId}&filters[start_time][$gte]=${encodeURIComponent(now)}&sort=start_time:asc`;

  const res = await fetch(url);
  const json = await res.json();
  return json.data;
}

const richardsAPI = {
  getMovies,
  getMovie,
  getReviewrating,
  getReviews,
  getUpcomingScreeningsForMovie,
}

export default richardsAPI;