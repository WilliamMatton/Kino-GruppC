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

async function loadReviewsForMovie(movieId) {
  const res = await fetch(
    `${REVIEWS_API}?filters[movie]=${movieId}`
  );
  const json = await res.json();

  return json.data ?? [];
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

const cmsAdapter = {
  loadReviewsForMovie,
};

export {cmsAdapter};

export async function averageMovieGrade(cmsAdapter, movieId) {
  const reviews = await cmsAdapter.loadReviewsForMovie(movieId);
  
  if (!reviews || reviews.length < 5) {
    return null;
  }
  
  const sum = reviews.reduce(
    (total, r) => total + r.attributes.rating,
    0
  );
  
  return sum / reviews.length;
}

const richardsAPI = {
  getMovies,
  getMovie,
  getReviewrating,
  getReviews,
  getUpcomingScreeningsForMovie,
  loadReviewsForMovie,
}

export default richardsAPI;