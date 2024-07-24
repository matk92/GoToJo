import Spinner from "../components/Spinner.js";
import { SportCard } from "../components/SportCard.js";
import DOMPlugin from "../core/DOMPlugin.js";

// On le passe en paramètre la carte pour pouvoir interagir avec
export default function SportsList(map, eventsList, selectedDate = undefined) {
  let allDates = [
    "2024-09-01",
    "2024-08-29",
    "2024-07-24",
    "2024-07-27",
    "2024-07-25",
    "2024-08-05",
    "2024-08-06",
    "2024-09-08",
    "2024-08-30",
    "2024-09-04",
    "2024-08-10",
    "2024-07-28",
    "2024-09-03",
    "2024-07-30",
    "2024-08-01",
  ];
  if (eventsList !== undefined) {
    if (selectedDate === undefined) selectedDate = "2024-07-27";
    if (eventsList.results !== undefined) eventsList = eventsList.results;
    for (let event of eventsList) {
      if (!allDates.includes(event.start_date)) {
        allDates.push(event.start_date);
      }
    }
    eventsList.sort((a, b) => {
      return new Date(b.start_date) - new Date(a.start_date);
    });
  }

  function changeDate(event) {
    let date = event.target.value;
    DOMPlugin.reRender("sportsList", SportsList(map, eventsList, date));
  }

  function onClickLocation(sport) {
    const element = document.getElementById("map-and-iframe-container");
    const offsetTop = 70; // adjust the offset value as needed
    window.scrollBy({
      top: element.getBoundingClientRect().top - offsetTop,
      behavior: "smooth",
    });
    map.showPosition(sport.point_geo.lat, sport.point_geo.lon, sport.nom_site, sport.sports);
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
                          style: {
                            color: "#000",
                          },
                        }
                      : {
                          value: date,
                          style: {
                            color: "#000",
                          },
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
                Spinner(),
              ]
            : eventsList
                .filter((event) => event.start_date <= selectedDate && event.end_date >= selectedDate)
                .map((sport) => SportCard(sport, () => onClickLocation(sport))),
      },
    ],
  };
}
