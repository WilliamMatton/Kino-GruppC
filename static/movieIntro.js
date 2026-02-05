const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const reviewList = document.querySelector('.movieReviewList');
const previousReviewPageBtn = document.querySelector('.previousReviewPageBtn');
const nextReviewPageBtn = document.querySelector('.nextReviewPageBtn');

let totalReviewPages = 0;
let currentReviewPage = 1;

// konvertera tid, som exempelvis 19:00, och lokal tid
function formatDateTime(isoString) {
  const newDate = new Date(isoString);
  const date = newDate.toLocaleDateString("sv-SE");
  const time = newDate.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${date} ${time}`;
}

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

  // kommande visningar för denna film
  const screeningsResponse = await fetch(`http://localhost:5080/screenings?movieId=${id}`,);
  const screeningsData = await screeningsResponse.json();

  // rendera start_time
  const screeningsWrap = document.querySelector(".movieDateAndTime");

  if (screeningsData.data.length === 0) {
    screeningsWrap.textContent = "Inga kommande visningar";
    return;
  }

  screeningsData.data.forEach((screening) => {
    const p = document.createElement("p");
    p.textContent = formatDateTime(screening.attributes.start_time);
    screeningsWrap.appendChild(p);
  });
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


async function submitReview(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const status = form.querySelector('.reviewStatus');
  const author = form.querySelector('.reviewName').value.trim();
  const rating = Number(form.querySelector('.reviewRatingInput').value);
  const comment = form.querySelector('.reviewCommentInput').value.trim();

  if (!author || !comment || !rating) {
    status.textContent = 'Fyll i alla fält.';
    return;
  }

  status.textContent = 'Skickar...';

  try {
    const response = await fetch('/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author,
        rating,
        comment,
        movie: id,
      }),
    });

    if (!response.ok) {
      throw new Error('Något gick fel');
    }

    createReview({ author, rating, comment });
    form.reset();
    status.textContent = 'Tack för din recension!';
  } catch (error) {
    status.textContent = 'Kunde inte skicka recension. Försök igen.';
  }
}

async function loadMovieReviews() {
  const response = await fetch('http://localhost:5080/reviews/' + id + "?page=" + currentReviewPage);
  const reviews = await response.json();
  totalReviewPages = reviews.meta.pagination.pageCount;
  return reviews.data;
}

async function renderMovieReviews() {
  const reviews = await loadMovieReviews();
  if(reviews.length === 0) return;
  
  reviewList.innerHTML = '';

  for(let i = 0; i < reviews.length; i++) {
    createReview(reviews[i]);
  }
}

function renderNextReviewPage() {
  if(currentReviewPage === totalReviewPages) return;
  currentReviewPage++;
  renderMovieReviews();
}

function renderPreviousReviewPage() {
  if(currentReviewPage === 1) return;
  currentReviewPage--;
  renderMovieReviews();
}

async function loadMovieRating() {
  const res = await fetch(`/movies/${id}/rating`);
  const rating = await res.json();
  if (rating.rating === null) return;

  const ratingEl = document.createElement('p');
  ratingEl.classList.add('movieRating');
  ratingEl.textContent =
    `Rating: ${rating.rating} (${rating.source})`;

  const movieImg = document.querySelector('.movieImg');
  movieImg.insertAdjacentElement('afterend', ratingEl);
}

loadMovie();
renderMovieReviews();
loadMovieRating();
showAverageRating();

const reviewForm = document.querySelector('.movieReviewForm');
reviewForm.addEventListener('submit', submitReview);
