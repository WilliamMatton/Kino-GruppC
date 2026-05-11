export function getReviewsWithPagination(allReviews, pageSize, pageNumber) {
  const start = (pageNumber - 1) * pageSize;
  return allReviews.slice(start, start + pageSize);
}