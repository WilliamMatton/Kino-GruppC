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

async function getReviewsForMovie(movieID, page) {
  const res = await fetch(MOVIE_API + '/reviews?filters[movie]=' + movieID
    + '&pagination[pageSize]=5&pagination[page]=' + page);
  const json = await res.json();
  return json;
}

async function createReview(review) {
  const res = await fetch(MOVIE_API + '/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        author: review.author,
        rating: review.rating,
        comment: review.comment,
        movie: review.movie,
      },
    }),
  });

  const json = await res.json();
  return json;
}

async function getUpcomingScreeningsForMovie(movieId) {
  const now = new Date().toISOString();
  const url = MOVIE_API + `/screenings?filters[movie]=${movieId}` + `&filters[start_time][$gte]=${encodeURIComponent(now)}` + `&sort=start_time:asc`;
  const res = await fetch(url);
  const json = await res.json();
  return json.data;
}

async function getMovieRating(movieId) {
  const res = await fetch(
    MOVIE_API +
    `/reviews?filters[movie]=${movieId}&pagination[pageSize]=100`
  );
  const json = await res.json();
  const reviews = json.data;

  if (reviews.length >= 5) {
    const avg =
      reviews.reduce((sum, r) => sum + r.attributes.rating, 0) /
      reviews.length;

    return {
      source: 'reviews',
      rating: Number(avg.toFixed(1)),
    };
  }

  const imdbRating = await getImdbRating(movieId);

  return {
    source: 'imdb',
    rating: imdbRating,
  };
}

async function getImdbRating(movieId) {

  const movieRes = await fetch(`${MOVIE_API}/movies/${movieId}`);
  const movieJson = await movieRes.json();
  const title = movieJson.data.attributes.title;

  const res = await fetch(
    `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=84cbe918`
  );
  const json = await res.json();

  if (json.Response === "True" && json.imdbRating !== "N/A") {
    return Number(json.imdbRating);
  }

  return 7.0;
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
  getReviewsForMovie,
  createReview,
  getUpcomingScreeningsForMovie,
  getMovieRating,
  loadReviewsForMovie,
}

export default richardsAPI;