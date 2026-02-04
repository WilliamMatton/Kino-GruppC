/* import richardsAPI from '../movieAPI.js';

global.fetch = jest.fn();

describe('getMovieRating', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('uses imdb rating when fewer than 5 reviews exist', async () => {
    fetch
      .mockResolvedValueOnce({
        json: async () => ({
          data: [
            { attributes: { rating: 4 } },
            { attributes: { rating: 5 } },
          ],
        }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          imdbRating: '7.8',
        }),
      });

    const result = await richardsAPI.getMovieRating(1);

    expect(result.source).toBe('imdb');
    expect(result.rating).toBe(7.8);
  });
});
 */