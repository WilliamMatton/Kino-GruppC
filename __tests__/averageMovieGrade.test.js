import { describe, expect, it } from '@jest/globals';
import { averageMovieGrade } from '/movieAPI.js';

describe('averageMovieGrade()', () => {
  it('returns average rating when reviews exist', async () => {
    const result = await averageMovieGrade(
      {
        loadReviewsForMovie: () => [
          { attributes: { rating: 4 } },
          { attributes: { rating: 6 } },
          { attributes: { rating: 2 } },
          { attributes: { rating: 2 } },
          { attributes: { rating: 2 } },
        ]
      },
      1
    );

    expect(result).toBe(3.2);
  });

  it('returns null if there are no reviews', async () => {
    const result = await averageMovieGrade(
      {
        loadReviewsForMovie: () => []
      },
      1
    );

    expect(result).toBeNull();
  });

  it('returns null if there are less than 5 reviews', async () => {
    const result = await averageMovieGrade(
      {
        loadReviewsForMovie: () => [
          { attributes: { rating: 4 } },
          { attributes: { rating: 6 } },
          { attributes: { rating: 2 } },
          { attributes: { rating: 3 } },
        ]
      },
      1
    );
    expect(result).toBeNull();
  });
});