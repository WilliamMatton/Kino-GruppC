fetch('movies.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.style.display = 'grid';
    cardsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    cardsContainer.style.gap = '1.25rem';
    cardsContainer.style.padding = '1rem';
    cardsContainer.style.justifyItems = 'center';
    // Create cards for each movies
    function createCard(data) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.id = data.id;
      card.dataset.name = data.name;
      card.dataset.genre = data.genre;
      card.dataset.duration_minutes = data.duration_minutes;
      card.dataset.dates = data.dates;
      card.dataset.img = data.img;
      const cardImage = document.createElement('img');
      cardImage.src = `${data.img}`;
      cardImage.alt = `Image for ${data.name}`;
      cardImage.classList.add('imageCard');

      const container = document.createElement('div');
      container.classList.add('container');

      const cardTitle = document.createElement('h3');
      cardTitle.classList.add('cardTitle');
      cardTitle.textContent = `${data.name}`;

      const cardInfo = document.createElement('p');
      cardInfo.classList.add('cardInfo');
      cardInfo.innerHTML = `${data.genre}`;

      const datesInfo = document.createElement('p');
      datesInfo.classList.add('datesInfo');
      datesInfo.innerHTML = `${data.dates}`;

      container.appendChild(cardTitle);
      container.appendChild(cardInfo);
      container.appendChild(datesInfo);
      card.appendChild(cardImage);
      card.appendChild(container);
      cardsContainer.appendChild(card);
    }

    data.movies.forEach(createCard);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });