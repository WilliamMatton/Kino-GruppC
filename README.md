**API-ENDPOINTS**
-----------------
GET /movies
Hämtar alla filmer.

GET /movies/:id
Hämtar en specifik film.
Parametrar: id – filmens id.

GET /movies/:id/rating
Hämtar genomsnittsligt betyg för en specifik film
Parametrar: id- filmens id
Svar: { "average": number }

GET /reviews/:id
Hämtar alla recensioner för en film.
Sorteras i fallande ordning på när recensionerna skapades
Parametrar: id – filmens id.

GET /screenings
Hämtar kommande visningar för en film.
Query (obligatorisk): movieId – filmens id.
Fel: 400 Bad Request om movieId saknas.

POST /reviews
Skapar en ny recension.
Body (JSON):
{ "movieId": 1, "rating": 5, "comment": "Great movie!" }
Svar: 201 Created, Fel: 500 Internal Server Error.
