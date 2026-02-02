const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const reviewList = document.querySelector('.movieReviewList');
const previousReviewPageBtn = document.querySelector('.previousReviewPageBtn');
const nextReviewPageBtn = document.querySelector('.nextReviewPageBtn');

let reviews = null;
let totalReviewPages = 0;
let currentReviewPage = 0;

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

previousReviewPageBtn.addEventListener('click', () => {
  renderPreviousReviewPage();
});

nextReviewPageBtn.addEventListener('click', () => {
  renderNextReviewPage();
});

function createReview(reviewData) {
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

  reviewRating.innerText = reviewData.attributes.rating + " av 5";
  reviewComment.innerText = reviewData.attributes.comment;
  reviewAuthor.innerText = reviewData.attributes.author;

  review.append(reviewComment);
  review.append(reviewAuthor);
  reviewListItem.append(reviewRating);
  reviewListItem.append(review);
  reviewList.append(reviewListItem);
}

async function loadMovieReviews() {
  const response = await fetch('http://localhost:5080/reviews/' + id);
  reviews = await response.json();
  if(reviews.length === 0) return;
  totalReviewPages = Math.ceil(reviews.length / 5);
  renderMovieReviews();
}

function renderMovieReviews() {
  reviewList.innerHTML = '';

  const reviewsToRender = reviews.slice(currentReviewPage * 5);

  for(let i = 0; i < (reviewsToRender.length > 5 ? 5 : reviewsToRender.length); i++) {
    createReview(reviewsToRender[i]);
  }
}

function renderNextReviewPage() {
  if(currentReviewPage + 1 === totalReviewPages) return;
  currentReviewPage++;
  renderMovieReviews();
}

function renderPreviousReviewPage() {
  if(currentReviewPage === 0) return;
  currentReviewPage--;
  renderMovieReviews();
}

loadMovie();
loadMovieReviews();