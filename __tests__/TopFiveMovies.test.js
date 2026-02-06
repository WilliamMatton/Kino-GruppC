import { describe, expect, it } from '@jest/globals';
import { topFiveMovies } from '/movieAPI.js';

describe('topFiveMovies()', () => {
	it('excludes movies without recent reviews', async () => {
		const recent = new Date().toISOString();
		const old = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString();
		const adapter = {
			getMovies: () => [
				{ id: 1, attributes: { title: 'a' } },
				{ id: 2, attributes: { title: 'b' } },
			],
			loadReviewsForMovie: (id) => {
				if (id === 1) {
					return [
						{ attributes: { rating: 5, createdAt: recent } },
						{ attributes: { rating: 4, createdAt: recent } },
						{ attributes: { rating: 3, createdAt: recent } },
						{ attributes: { rating: 2, createdAt: recent } },
						{ attributes: { rating: 1, createdAt: recent } },
					];
				}
				if (id === 2) {
					return [
						{ attributes: { rating: 5, createdAt: old } },
						{ attributes: { rating: 4, createdAt: old } },
						{ attributes: { rating: 3, createdAt: old } },
						{ attributes: { rating: 2, createdAt: old } },
						{ attributes: { rating: 1, createdAt: old } },
					];
				}
				return [];
			},
		};
		const result = await topFiveMovies(adapter);
		expect(result.map(m => m.id)).toEqual([1]);
	});
	it('returns max five movies', async () => {
		const recent = new Date().toISOString();
		const adapter = {
			getMovies: () => [
				{ id: 1, attributes: { title: 'a' } },
				{ id: 2, attributes: { title: 'b' } },
				{ id: 3, attributes: { title: 'c' } },
				{ id: 4, attributes: { title: 'd' } },
				{ id: 5, attributes: { title: 'e' } },
				{ id: 6, attributes: { title: 'f' } },
			],
			loadReviewsForMovie: (id) => {
				if (id === 1) return [
					{ attributes: { rating: 5, createdAt: recent } },
					{ attributes: { rating: 5, createdAt: recent } },
					{ attributes: { rating: 5, createdAt: recent } },
				];
				if (id === 2) return [
					{ attributes: { rating: 4, createdAt: recent } },
					{ attributes: { rating: 4, createdAt: recent } },
					{ attributes: { rating: 4, createdAt: recent } },
				];
				if (id === 3) return [
					{ attributes: { rating: 3, createdAt: recent } },
					{ attributes: { rating: 3, createdAt: recent } },
				];
				if (id === 4) return [
					{ attributes: { rating: 2, createdAt: recent } },
					{ attributes: { rating: 2, createdAt: recent } },
				];
				if (id === 5) return [
					{ attributes: { rating: 1, createdAt: recent } },
					{ attributes: { rating: 1, createdAt: recent } },
				];
				if (id === 6) return [
					{ attributes: { rating: 0, createdAt: recent } },
					{ attributes: { rating: 0, createdAt: recent } },
				];
				return [];
			},
		};
		const result = await topFiveMovies(adapter);
		expect(result.length).toBe(5);
		expect(result.map(m => m.id)).toEqual([1,2,3,4,5]);
	});
	it('uses only recent ratings for average', async () => {
		const recent = new Date().toISOString();
		const old = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString();
		const adapter = {
			getMovies: () => [
				{ id: 1, attributes: { title: 'a' } },
				{ id: 2, attributes: { title: 'b' } },
			],
			loadReviewsForMovie: (id) => {
				if (id === 1) return [
					{ attributes: { rating: 5, createdAt: recent } },
					{ attributes: { rating: 5, createdAt: recent } },
					{ attributes: { rating: 1, createdAt: old } },
					{ attributes: { rating: 1, createdAt: old } },
				];
				if (id === 2) return [
					{ attributes: { rating: 4, createdAt: recent } },
					{ attributes: { rating: 4, createdAt: recent } },
					{ attributes: { rating: 4, createdAt: recent } },
				];
				return [];
			},
		};
		const result = await topFiveMovies(adapter);
		expect(result.map(m => m.id)).toEqual([1,2]);
	});
});
