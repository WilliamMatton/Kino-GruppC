// Denna fil är endast ett exempel på hur vi kopplar vår egen kod
// till vårt API genom en browser-fetch.

function loadMovies() { // exempel för att ladda alla filmer
  // länka till din resurs i movieAPI.js via http://localhost:5080/
  const movies = fetch('http://localhost:5080/movies');
}

loadMovies(); // anropa funktionen när sidan har laddat