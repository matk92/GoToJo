const url =
"https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=9";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const eventsList = document.querySelector(".events-list");
    data.results.forEach((record) => {
  const eventCard = document.createElement("div");
  eventCard.classList.add("event-card");

  const sportName = document.createElement("h3");
  sportName.textContent = record.sports; // Remplacez 'nom_sport' par le champ approprié de l'API
  eventCard.appendChild(sportName);

  const eventDate = document.createElement("p");
  eventDate.textContent = record.start_date; // Remplacez 'date' par le champ approprié de l'API
  eventCard.appendChild(eventDate);

  const eventLocation = document.createElement("p");
  eventLocation.textContent = record.adress; // Remplacez 'adresse' par le champ approprié de l'API
  eventCard.appendChild(eventLocation);

  eventsList.appendChild(eventCard);
    });
  });