import { describe, expect, it } from '@jest/globals';
import { averageMovieGrade } from '../movieAPI.js';

describe('averageMovieGrade()', () => {
    it('returns the average movie grade from api', async () => {
        const result = await averageMovieGrade(1);

        console.log('AVERAGE:', result);
    });
});