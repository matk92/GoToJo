import { SportCard } from "../components/SportCard.js";

export default function SportsList() {
  return new Promise(async (resolve, reject) => {
    const url =
      "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=9";

    let eventsList = await fetch(url)
      .then((response) => response.json())
      .catch(reject);

    resolve({
      type: "div",
      props: {
        style: {
          "text-align": "center",
          "margin-top": "20px",
          "margin-bottom": "20px",
        },
      },
      children: [
        {
          type: "h2",
          props: {
            style: {
              "font-size": "2rem",
              margin: "20px auto",
            },
          },
          children: [
            {
              type: "TEXT_NODE",
              content: "Prochains événements",
            },
          ],
        },
        {
          type: "p",
          props: {
            style: {
              "font-size": "1.5rem",
              margin: "20px auto",
            },
          },
          children: [
            {
              type: "TEXT_NODE",
              content: "Trouvez les meilleurs événements près de chez vous",
            },
          ],
        },
        {
          type: "div",
          head: ['<link rel="stylesheet" href="styles/sportCard.css" />'],
          props: {
            style: {
              display: "grid",
              gap: "20px",
              "grid-template-columns": "repeat(auto-fill, minmax(300px, 1fr))",
              "justify-content": "center",
              "align-items": "center",
              padding: "20px",
            },
          },
          children: eventsList.results.map((sport) => SportCard(sport)),
        },
      ],
    });
  });
}
