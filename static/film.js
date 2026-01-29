fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(apiData => {
    const cardsContainer = document.getElementById('cardsContainer');
    if (!cardsContainer) return;

    
    cardsContainer.style.display = 'grid';
    cardsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    cardsContainer.style.gap = '1.25rem';
    cardsContainer.style.padding = '1rem';
    cardsContainer.style.justifyItems = 'center';
    cardsContainer.innerHTML = '';

  
    const movies = Array.isArray(apiData.data) ? apiData.data : [];

    function createCard(movie) {
      const attrs = movie.attributes || {};
      const imageUrl = attrs.image && attrs.image.url ? attrs.image.url : '';
      const title = attrs.title || 'Titel saknas';
      const intro = attrs.intro || '';

      const card = document.createElement('div');
      card.classList.add('card');

      card.addEventListener('click', () => {
        window.location.href = `/movieIntro.html?id=${movie.id}`;
      });
      card.style.cursor = 'pointer';
      card.dataset.id = movie.id;
      card.dataset.name = title;
      card.dataset.img = imageUrl;

      const cardImage = document.createElement('img');
      cardImage.src = imageUrl;
      cardImage.alt = `Image for ${title}`;
      cardImage.classList.add('imageCard');

      const container = document.createElement('div');
      container.classList.add('container');

      const cardTitle = document.createElement('h3');
      cardTitle.classList.add('cardTitle');
      cardTitle.textContent = title;

      const cardInfo = document.createElement('p');
      cardInfo.classList.add('cardInfo');
      cardInfo.textContent = intro;

      container.appendChild(cardTitle);
      if (intro) container.appendChild(cardInfo);
      card.appendChild(cardImage);
      card.appendChild(container);
      cardsContainer.appendChild(card);
    }

    movies.forEach(createCard);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });