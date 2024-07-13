import { SportCard } from "../components/SportCard.js";
import DOMPlugin from "../core/DOMPlugin.js";

export default function SportsList(selectedDate = undefined) {
  return new Promise(async (resolve, reject) => {
    const url =
      "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=63";

    let eventsList = await fetch(url)
      .then((response) => response.json())
      .catch(reject);
    eventsList = eventsList.results;
    eventsList.sort((a, b) => {
      return new Date(a.start_date) - new Date(b.start_date);
    });
    console.log(eventsList);

    if (selectedDate === undefined) selectedDate = eventsList[0].start_date;

    let allDates = [];
    for (let event of eventsList) {
      if (!allDates.includes(event.start_date)) {
        allDates.push(event.start_date);
      }
    }

    function changeDate(event) {
      let date = event.target.value;
      DOMPlugin.reRender("sportsList", SportsList(date));
    }

    resolve({
      type: "div",
      props: {
        id: "sportsList",
        style: {
          "text-align": "center",
          margin: "50px 0px",
        },
      },
      children: [
        {
          type: "h2",
          props: {
            style: {
              "font-size": "2rem",
              margin: "0px",
            },
          },
          children: [
            {
              type: "TEXT_NODE",
              content: "Trouvez les meilleurs événements près de chez vous !",
            },
          ],
        },
        {
          type: "div",
          props: {
            class: "barlow-bold",
            style: {
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              gap: "10px",
              margin: "20px auto",
            },
          },
          children: [
            {
              type: "p",
              props: {
                style: {
                  "font-size": "1.5rem",
                },
              },
              children: [
                {
                  type: "TEXT_NODE",
                  content: "Evenements pour le ",
                },
              ],
            },
            {
              type: "select",
              events: {
                change: [changeDate],
              },
              props: {
                class: "barlow-bold",
                style: {
                  "font-size": "1rem",
                  padding: "10px",
                  "border-radius": "10px",
                  color: "#f5f5f5",
                  "background-color": "transparent",
                },
              },
              children: [
                ...allDates.map((date) => {
                  return {
                    type: "option",
                    props:
                      date === selectedDate
                        ? {
                            selected: true,
                            value: date,
                          }
                        : {
                            value: date,
                          },
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: date,
                      },
                    ],
                  };
                }),
              ],
            },
          ],
        },
        {
          type: "div",
          head: ['<link rel="stylesheet" href="styles/sportCard.css" />'],
          props: {
            style: {
              display: "grid",
              gap: "10px",
              "grid-template-columns": "repeat(auto-fill, minmax(300px, 375px))",
              "justify-content": "center",
              "align-items": "center",
            },
          },
          children: eventsList.filter((event) => event.start_date === selectedDate).map((sport) => SportCard(sport)),
        },
      ],
    });
  });
}
