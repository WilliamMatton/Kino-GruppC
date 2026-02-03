const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function loadMovie() {
  const response = await fetch(
    `http://localhost:5080/movies/` + id
  );
  const movie = await response.json();
  
  document.querySelector('.movieTitle').textContent =
    movie.attributes.title;

  document.querySelector('.movieIntro').textContent =
    movie.attributes.intro;

  const img = document.querySelector('.movieImg');
  img.src = movie.attributes.image.url;
  img.alt = movie.attributes.title;
}

async function showAverageRating() {
  const res = await fetch(
    `http://localhost:5080/movies/${id}/average-rating`
  );
  const data = await res.json();

  const ratingEl = document.querySelector('.movieAverageRating');

  if (data.average === null) {
    ratingEl.textContent = '';
  } else {
    ratingEl.textContent = `${data.average.toFixed(1)} / 5 Rating`;
  }
}

function createReview() {
  const reviewList = document.querySelector('.movieReviewList');
  const reviewListItem = document.createElement('li');
  const reviewRating = document.createElement('small');
  const review = document.createElement('div');
  const reviewComment = document.createElement('p');
  const reviewAuthor = document.createElement('small');

  reviewListItem.classList.add('movieReviewListItem');
  reviewRating.classList.add('movieReviewRating');
  review.classList.add('movieReview');
  reviewComment.classList.add('movieReviewComment');
  reviewAuthor.classList.add('movieReviewAuthor');

  reviewRating.innerText = "";
  reviewComment.innerText = "Detta är en recension på en film.";
  reviewAuthor.innerText = "John Doe";

  review.append(reviewComment);
  review.append(reviewAuthor);
  reviewListItem.append(reviewRating);
  reviewListItem.append(review);
  reviewList.append(reviewListItem);
}

showAverageRating();
loadMovie();
createReview();