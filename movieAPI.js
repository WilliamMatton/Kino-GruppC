const MOVIE_API = 'https://plankton-app-xhkom.ondigitalocean.app/api';

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

async function getScreenings() {
  const res = await fetch(MOVIE_API + '/screenings');
  const text = await res.json();
  return text.data;
}

const richardsAPI = {
  getMovies,
  getMovie,
  getScreenings
}

export default richardsAPI;