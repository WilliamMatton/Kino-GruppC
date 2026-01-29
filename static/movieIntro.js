const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function loadMovie() {
  const response = await fetch(
    `https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`
  );

  const json = await response.json();
  const movie = json.data;

  document.querySelector('.movieTitle').textContent =
    movie.attributes.title;

  document.querySelector('.movieIntro').textContent =
    movie.attributes.intro;

  const img = document.querySelector('.movieImg');
  img.src = movie.attributes.image.url;
  img.alt = movie.attributes.title;
}

loadMovie();