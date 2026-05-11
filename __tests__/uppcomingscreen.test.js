// test för koll visningar för kommande fem dagar
import { jest } from "@jest/globals";
import { getcomingMovies } from "../movieAPI.js";

test("should fetch screenings for next five days", async () => {

 // 2. Sätt fast datum (idag: 2026-05-11)
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2026-05-11T12:00:00Z'));

  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({
      
      data: [
        {  attributes: { start_time: "2026-05-11T17:00:00.000Z" } 
        },
        {  attributes: { start_time: "2026-05-11T21:00:00.000Z" } 
        },
        {  attributes: { start_time: "2026-05-12T12:00:00.000Z" } 
        },
         {  attributes: { start_time: "2026-05-12T21:00:00.000Z" } 
        },
        {  attributes: { start_time: "2026-05-13T12:00:00.000Z" } 
        },
      ],
    }),
  });

  const result = await getcomingMovies();
 expect(result[0].attributes.start_time).toBe('2026-05-11T17:00:00.000Z');
  expect(result[1].attributes.start_time).toBe('2026-05-11T21:00:00.000Z');
  expect(result[2].attributes.start_time).toBe('2026-05-12T12:00:00.000Z');
  expect(result[3].attributes.start_time).toBe('2026-05-12T21:00:00.000Z');
  expect(result[4].attributes.start_time).toBe('2026-05-13T12:00:00.000Z');

 });

