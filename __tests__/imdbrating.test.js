import { jest } from '@jest/globals';
import richardsAPI from '../movieAPI.js';

global.fetch = jest.fn();

describe('getMovieRating', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('uses imdb rating when fewer than 5 reviews exist', async () => {

    fetch.mockResolvedValueOnce({
      json: async () => ({
        data: [
          { attributes: { rating: 4 } },
          { attributes: { rating: 5 } },
        ],
      }),
    });

 
    fetch.mockResolvedValueOnce({
      json: async () => ({
        data: {
          attributes: {
            title: 'Inception',
          },
        },
      }),
    });

    fetch.mockResolvedValueOnce({
      json: async () => ({
        Response: 'True',
        imdbRating: '8.8',
      }),
    });

    const result = await richardsAPI.getMovieRating(1);

    expect(result.source).toBe('imdb');
    expect(result.rating).toBe(8.8);
  });
});
