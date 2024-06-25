fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const eventsList = document.querySelector(".events-list");
    data.results.forEach((record) => {
  const eventCard = document.createElement("div");
  eventCard.classList.add("event-card");

  const sportName = document.createElement("h3");
  sportName.textContent = record.sports;
  eventCard.appendChild(sportName);

  const eventDate = document.createElement("p");
  eventDate.textContent = record.start_date;
  eventCard.appendChild(eventDate);

  const eventLocation = document.createElement("p");
  eventLocation.textContent = record.adress;
  eventCard.appendChild(eventLocation);

  eventsList.appendChild(eventCard);
    });
  });