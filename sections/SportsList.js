import { SportCard } from "../components/SportCard.js";
import DOMPlugin from "../core/DOMPlugin.js";

// On le passe en paramètre la carte pour pouvoir interagir avec
export default function SportsList(map, eventsList, selectedDate = undefined) {
  let allDates = [];
  if (eventsList !== undefined) {
    eventsList = eventsList.results;
    eventsList.sort((a, b) => {
      return new Date(a.start_date) - new Date(b.start_date);
    });
    console.log(eventsList);

    if (selectedDate === undefined) selectedDate = "2024-07-27";

    for (let event of eventsList) {
      if (!allDates.includes(event.start_date)) {
        allDates.push(event.start_date);
      }
    }
  }

  function changeDate(event) {
    let date = event.target.value;
    DOMPlugin.reRender("sportsList", SportsList(map, date));
  }

  function onClickLocation(sport) {
    const element = document.getElementById("map-and-iframe-container");
    const offsetTop = 70; // adjust the offset value as needed
    window.scrollBy({
      top: element.getBoundingClientRect().top - offsetTop,
      behavior: "smooth",
    });
    map.showPosition(sport.point_geo.lat, sport.point_geo.lon, `<b>${sport.nom_site}</b><br>${sport.sports}`);
  }

  return {
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
        children:
          eventsList === undefined
            ? [
                {
                  type: "p",
                  children: [
                    {
                      type: "TEXT_NODE",
                      content: "Récupération des données...",
                    },
                  ],
                },
                {
                  type: "div",
                  // TODO spinner
                },
              ]
            : eventsList
                .filter((event) => event.start_date === selectedDate)
                .map((sport) => SportCard(sport, () => onClickLocation(sport))),
      },
    ],
  };
}
