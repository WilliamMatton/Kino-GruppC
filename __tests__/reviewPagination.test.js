import { describe, expect, test } from '@jest/globals';
import { getReviewsWithPagination } from '../static/pagination.js';

const mockAPI = {
  getReviewsForMovie: (id) => {
    return {
      "data": [
        {
          "id": 1607,
          "attributes": {
            "comment": "bra film",
            "rating": 4,
            "author": "test",
            "verified": null,
            "createdAt": "2025-05-29T11:15:52.807Z",
            "updatedAt": "2025-05-29T11:15:52.807Z"
          }
        },
        {
          "id": 1615,
          "attributes": {
            "comment": "WOAH",
            "rating": 5,
            "author": null,
            "verified": null,
            "createdAt": "2025-07-14T09:51:32.689Z",
            "updatedAt": "2025-07-14T09:51:32.689Z"
          }
        },
        {
          "id": 1616,
          "attributes": {
            "comment": "WOAH",
            "rating": 5,
            "author": null,
            "verified": null,
            "createdAt": "2025-07-14T09:56:49.564Z",
            "updatedAt": "2025-07-14T09:56:49.564Z"
          }
        },
        {
          "id": 1617,
          "attributes": {
            "comment": "Sämst",
            "rating": 0,
            "author": null,
            "verified": null,
            "createdAt": "2025-07-15T05:46:39.002Z",
            "updatedAt": "2025-07-15T05:46:39.002Z"
          }
        },
        {
          "id": 1618,
          "attributes": {
            "comment": "Väldigt bra",
            "rating": 4,
            "author": "Joel",
            "verified": null,
            "createdAt": "2025-07-15T05:50:18.849Z",
            "updatedAt": "2025-07-15T05:50:18.849Z"
          }
        },
        {
          "id": 1619,
          "attributes": {
            "comment": "ok",
            "rating": 3,
            "author": "Sophie",
            "verified": null,
            "createdAt": "2025-07-15T05:54:18.190Z",
            "updatedAt": "2025-07-15T05:54:18.190Z"
          }
        },
        {
          "id": 1620,
          "attributes": {
            "comment": "ok",
            "rating": 3,
            "author": "Sophie",
            "verified": null,
            "createdAt": "2025-07-15T05:58:08.641Z",
            "updatedAt": "2025-07-15T05:58:08.641Z"
          }
        },
        {
          "id": 1690,
          "attributes": {
            "comment": "bra!",
            "rating": 5,
            "author": "vvv",
            "verified": null,
            "createdAt": "2026-02-03T10:03:39.561Z",
            "updatedAt": "2026-02-03T10:03:39.561Z"
          }
        }
      ]
    }
  }
}

describe('Movie review pagination', () => {
  let reviews = mockAPI.getReviewsForMovie(1).data;

  test('Page 1 returns 5 reviews', async () => {
    let paginatedReviews = getReviewsWithPagination(reviews, 5, 1);
    expect(paginatedReviews.length).toBe(5);
  });

  test('Page 2 returns 3 reviews', async () => {
    let paginatedReviews = getReviewsWithPagination(reviews, 5, 2);
    expect(paginatedReviews.length).toBe(3);
  });
});