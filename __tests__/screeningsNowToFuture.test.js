
// test för koll av, endast kommande visningar för en film
import { jest } from "@jest/globals";
import { getUpcomingScreeningsForMovie } from "../movieAPI.js";

test("filters out past screenings and keeps now+future", async () => {
  const nowDateTime = "2026-02-05T12:00:00.000Z";

  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({
      data: [
        { id: 1, 
            attributes: { start_time: "2025-02-05T10:00:00.000Z" } 
        },
        { id: 2, 
            attributes: { start_time: "2026-02-05T12:00:00.000Z" } 
        },
        { id: 3, 
            attributes: { start_time: "2027-02-05T14:00:00.000Z" } 
        },
      ],
    }),
  });

  const result = await getUpcomingScreeningsForMovie("42", nowDateTime);

  expect(result.map((x) => x.id)).toEqual([2, 3]);

});
