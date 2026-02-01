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

  reviewRating.innerText = "4 av 5";
  reviewComment.innerText = "Detta är en recension på en film.";
  reviewAuthor.innerText = "John Doe";

  review.append(reviewComment);
  review.append(reviewAuthor);
  reviewListItem.append(reviewRating);
  reviewListItem.append(review);
  reviewList.append(reviewListItem);
}

loadMovie();
createReview();