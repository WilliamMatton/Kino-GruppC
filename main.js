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
     // card.classList.add('card');
      // Add styles to card
      card.style.backgroundColor = "white";
      card.style.border = "011827";
      card.style.borderRadius = "0.5rem";
      card.style.boxShadow = "0 0.25rem 0.75rem rgba(0, 0, 0, 0.233)";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.overflow = "hidden";
      card.style.width = "100%";

      card.dataset.id = data.id;
      card.dataset.name = data.name;
      card.dataset.genre = data.genre;
      card.dataset.duration_minutes = data.duration_minutes;
      card.dataset.dates = data.dates;
      card.dataset.img = data.img;
      const cardImage = document.createElement('img');
      cardImage.src = `${data.img}`;
      cardImage.alt = `Image for ${data.name}`;
     // cardImage.classList.add('imageCard');
      // Add style to cardImage
      cardImage.style.width = "100%";
      cardImage.style.height = "270px";
      cardImage.style.objectFit = "fill";
      cardImage.style.display = "block";

      const container = document.createElement('div');
      //container.classList.add('container');
       // Add style to container
       container.style.display = "flex";
       container.style.flexDirection = "column";
       container.style.flex = "1";

      const cardTitle = document.createElement('h3');
      cardTitle.classList.add('cardTitle');
      // Add style to cardTitle 
      cardTitle.style.fontSize = "1.6rem";
      cardTitle.style.fontWeight = "400";
      cardTitle.style.textAlign = "left";
      cardTitle.style.marginLeft = "0.6rem";
      cardTitle.style.marginTop = "0.5rem";

      cardTitle.textContent = `${data.name}`;

      const cardInfo = document.createElement('p');
      //cardInfo.classList.add('cardInfo');
      // Add style to cardInfo
      cardInfo.style.fontSize = "1rem";
      cardInfo.style.fontWeight = "400";
      cardInfo.style.padding = "0.6rem";
      cardInfo.style.margin = "0";
      cardInfo.style.textAlign = "justify";

      cardInfo.innerHTML = `${data.genre}`;

      const datesInfo = document.createElement('p');
      //datesInfo.classList.add('datesInfo');
      // Add style to datesInfo
      datesInfo.style.fontSize = "1rem";
      datesInfo.style.fontWeight = "400";
      datesInfo.style.padding = " 0.6rem";
      datesInfo.style.margin = "0";
      datesInfo.style.textAlign = "justify";
      
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