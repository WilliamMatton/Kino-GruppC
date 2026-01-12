document.addEventListener('DOMContentLoaded', function() {

  // Hitta Main på sidan
  const main = document.querySelector('.siteMain');
  if (!main) return;

  // Skapa en sektion för filmerna
  const section = document.createElement('section');
  section.className = 'moviesSection';

  // Skapa en titel
  const title = document.createElement('h1');
  title.className = 'moviesTitle';

  // Skapa ett div för filmerna
  const grid = document.createElement('div');
  grid.className = 'moviesGrid';

  // Lägg till allt i sektionen
  section.appendChild(title);
  section.appendChild(grid);
  main.appendChild(section);

  // Ladda filmerna
  loadMovies(grid);
});

// Funktion för att ladda filmer från JSON-filen
function loadMovies(grid) {
  // Hämta filmer från movies.json
  fetch('movies.json')
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Kunde inte hämta filmer.');
      }
      return response.json();
    })
    .then(function(data) {
      // Hämta filmerna från data
      const movies = data.movies || [];

      // Kolla om vi har några filmer
      if (movies.length === 0) {
        return;
      }

      // Gruppera filmer efter datum
      const groups = groupMoviesByDate(movies);
      
      grid.innerHTML = '';

      // Skapa en grupp för varje datum
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const groupElement = createDateGroup(group.date, group.movies);
        grid.appendChild(groupElement);
      }
    })
    .catch(function(error) {
      console.error(error);
    });
}

// Funktion för att skapa en datumgrupp med filmer
function createDateGroup(dateStr, movies) {
  // Skapa en wrapper för gruppen
  const wrapper = document.createElement('div');
  wrapper.className = 'dateGroup';

  // Skapa en rubrik för datumet
  const heading = document.createElement('h2');
  heading.className = 'dateHeader';
  heading.textContent = 'Filmer som visas ' + formatDate(dateStr);

  // Skapar ett gid för filmerna
  const grid = document.createElement('div');
  grid.className = 'dateMoviesGrid';

  // Lägg till varje film i kortet
  for (let i = 0; i < movies.length; i++) {
    const movieCard = createMovieCard(movies[i]);
    grid.appendChild(movieCard);
  }

  // Lägger till rubrik och grid i wrapper
  wrapper.appendChild(heading);
  wrapper.appendChild(grid);
  
  return wrapper;
}

// Funktion för att skapa ett filmkort
function createMovieCard(movie) {
  // Skapa kortet
  const card = document.createElement('article');
  card.className = 'card';

  // Skapa filmbild
  const img = document.createElement('img');
  img.className = 'imageCard';
  img.src = movie.img || '';
  img.alt = movie.name ? movie.name + ' poster' : 'Filmaffisch';
  img.loading = 'lazy';

  // Skapa filmtitel
  const title = document.createElement('h3');
  title.className = 'cardTitle';
  title.textContent = movie.name || 'Titel saknas';

  // Skapa genre
  const genre = document.createElement('p');
  genre.className = 'cardGenre';
  genre.textContent = movie.genre || 'Okänd genre';

  // Skapar tiden
  const meta = document.createElement('p');
  meta.className = 'cardTime';

  // Lägg till klockikon
  const clock = document.createElement('i');
  clock.className = 'fa-regular fa-clock';

  // Lägg till längd
  const duration = document.createElement('span');
  duration.textContent = formatDuration(movie.duration_minutes);

  meta.appendChild(clock);
  meta.appendChild(duration);

  // Skapa boka-knapp
  const bookBtn = document.createElement('button');
  bookBtn.className = 'cardBookBtn';
  bookBtn.textContent = 'Boka nu';

  // Lägg till allt i kortet
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(genre);
  card.appendChild(meta);
  card.appendChild(bookBtn);

  return card;
}

// Funktion för att formatera filmens längd
function formatDuration(minutes) {
  // Kolla om vi har ett giltigt tal
  if (!minutes || isNaN(minutes)) {
    return 'Okänd längd';
  }
  
  // Räkna ut timmar och minuter
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  // Om ingen timme, visa bara minuter
  if (hours === 0) {
    return mins + ' min';
  }
  
  // Annars visa både timmar och minuter
  const minsText = mins < 10 ? '0' + mins : mins;
  return hours + 'h ' + minsText + ' min';
}

// Funktion för att gruppera filmer efter datum
function groupMoviesByDate(movies) {
  const dateGroups = {};
  
  // Gå igenom varje film
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    
    // Kolla om filmen har datum
    if (movie.dates && Array.isArray(movie.dates)) {
      // Gå igenom varje datum för filmen
      for (let j = 0; j < movie.dates.length; j++) {
        const date = movie.dates[j];
        
        // Skapa en ny grupp om den inte finns
        if (!dateGroups[date]) {
          dateGroups[date] = [];
        }
        
        // Lägg till filmen i datumgruppen
        dateGroups[date].push(movie);
      }
    }
  }
  
  // Konvertera till en array och sortera efter datum
  const groups = [];
  for (const date in dateGroups) {
    groups.push({
      date: date,
      movies: dateGroups[date]
    });
  }
  
  // Sortera grupperna efter datum
  groups.sort(function(a, b) {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });
  
  return groups;
}

// Funktion för att formatera datum till svensk text
function formatDate(dateStr) {
  // Skapa ett datumobjekt från datumsträng (t.ex. "2025-12-20")
  const date = new Date(dateStr + 'T00:00:00');
  
  // Kolla om datumet är giltigt
  if (isNaN(date.getTime())) {
    return dateStr;
  }

  // Formatera datumet på svenska:
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return date.toLocaleDateString('sv-SE', options);
}
