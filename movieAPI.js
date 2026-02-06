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

export async function getReviewsForMovie(movieID) {
  let allReviews = [];
  let page = 1;
  let hasMorePages = true;

  const meta = await fetch(MOVIE_API + '/reviews?filters[movie]=' + movieID);
  const metaJson = await meta.json();

  while (hasMorePages) {
    const res = await fetch(MOVIE_API + '/reviews?filters[movie]=' + movieID + '&sort=createdAt:desc' + '&pagination[page]=' + page);
    const json = await res.json();
    allReviews = allReviews.concat(json.data || []);
    
    if (json.meta?.pagination?.pageCount && page >= json.meta.pagination.pageCount) {
      hasMorePages = false;
    }
    page++;
  }

  return {
    data: allReviews,
    meta: metaJson
  };
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

export async function averageMovieGrade(getReviewsForMovie, movieId) {
  const res = await getReviewsForMovie(movieId);
  const reviews = res.data;
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
}

export default richardsAPI;